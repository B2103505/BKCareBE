import ClinicService from "../services/clinicService";

let CreateClinic = async (req, res) => {
  try {
    let infor = await ClinicService.CreateClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let infor = await ClinicService.getAllClinic();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};

module.exports = {
  CreateClinic: CreateClinic,
  getAllClinic: getAllClinic,
};
