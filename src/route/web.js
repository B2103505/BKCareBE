import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController";
import PatientController from "../controllers/PatientController";
import SpecialtyController from "../controllers/SpecialtyController";
import ClinicController from "../controllers/ClinicController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", HomeController.getHomePage);
  router.get("/about", HomeController.getAbout);

  router.get("/crud", HomeController.getCrud);
  router.post("/post-crud", HomeController.postCrud);
  router.get("/get-crud", HomeController.displayGetCrud);

  router.get("/edit-crud", HomeController.getEditCRUD);
  router.post("/put-crud", HomeController.putCRUD);
  router.get("/delete-crud", HomeController.deleteCRUD);

  //RestApi
  router.post("/api/login", UserController.handleLogin); //login
  router.get("/api/get-all-user", UserController.handleGetAllUsers); //get all user 4 redux manage user
  router.post("/api/create-new-user", UserController.handleCreateNewUser); //create new user
  router.put("/api/edit-user", UserController.handleEditUser); 
  router.delete("/api/delete-user", UserController.handleDeleteUser);//delete
  router.get("/api/allcode", UserController.getAllCode);

  router.get("/api/top-doctor-home", DoctorController.getTopDoctorHome);
  router.get("/api/get-all-doctor", DoctorController.getAllDoctors);
  router.post("/api/save-info-doctor", DoctorController.PostInfoDoctor); //manage doctor_info
  router.get("/api/get-detail-doctor", DoctorController.getDetailDoctor); //get detail doctor
  router.post("/api/bulk-create-schedule", DoctorController.BulkCreateSchedule); //manage schedule
  router.get("/api/get-schedule-doctor-bydate", DoctorController.getScheduleByDate);
  router.get("/api/get-extra-info-doctor-byId", DoctorController.getExtraInfoById);
  router.get("/api/get-profile-doctor-byId", DoctorController.getProfileDoctorById);

  router.post("/api/send-remedy", DoctorController.sendRemedy); //send invoice
  router.get("/api/get-list-patient-for-doctor", DoctorController.getListPatientForDoctor);

  router.post("/api/patient-book-appointment", PatientController.PostBookAppointment); //book appointment
  router.post("/api/verify-book-appointment", PatientController.PostVerifyBookAppointment);//verify book

  router.post("/api/create-new-specialty", SpecialtyController.CreateNewSpecialty); //new specialty
  router.get("/api/get-all-specialty", SpecialtyController.getAllSpecialty);
  router.get("/api/get-detail-specialty-byId", SpecialtyController.getDetailSpecialtyById); //get detail specialty

  router.post("/api/create-new-clinic", ClinicController.CreateClinic); //new clinic
  router.get("/api/get-all-clinic", ClinicController.getAllClinic);
  router.get("/api/get-detail-clinic-by-id", ClinicController.getClinicById); //detail clinic

  return app.use("/", router);
};

module.exports = initWebRoutes;
