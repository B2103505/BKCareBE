import PatientService from '../services/Patient_service'
let PostBookAppointment = async (req,res) => {
    try {
            let infor = await PatientService.PostBookAppointmentService(req.body);
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
    PostBookAppointment,
}