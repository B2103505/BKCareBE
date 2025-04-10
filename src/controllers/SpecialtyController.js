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

let getAllSpecialty = async (req,res) => {
    try {
            let infor = await SpecialtyService.getAllSpecialtyService();
            return res.status(200).json(infor)
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage: 'error from server'
            })
        }
}

let getDetailSpecialtyById = async (req,res) => {
    try {
            let infor = await SpecialtyService.getDetailSpecialtyByIdService(req.query.id, req.query.location);
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
    CreateNewSpecialty, getAllSpecialty,
    getDetailSpecialtyById,
}