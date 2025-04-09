import SpecialtyService from '../services/Specialty_service'

let CreateNewSpecialty = async (req,res) => {
    try {
            let infor = await SpecialtyService.CreateNewSpecialtyService(req.body);
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
    CreateNewSpecialty,
}