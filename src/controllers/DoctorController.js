import DoctorService from "../services/Doctor_service"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10;
    try {
        let response = await DoctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from server...'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}