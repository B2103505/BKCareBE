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

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await DoctorService.getAllDoctors();
        return res.status(200).json(doctors)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }

}

let PostInfoDoctor = async (req, res) => {
    try {
        let response = await DoctorService.saveInfoDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let infor = await DoctorService.getDetailDoctorService(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let BulkCreateSchedule = async (req, res) => {
    try {
        let infor = await DoctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    PostInfoDoctor: PostInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    BulkCreateSchedule: BulkCreateSchedule
}