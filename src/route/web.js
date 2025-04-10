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
  router.post("/api/login", UserController.handleLogin);
  router.get("/api/get-all-user", UserController.handleGetAllUsers);
  router.post("/api/create-new-user", UserController.handleCreateNewUser);
  router.put("/api/edit-user", UserController.handleEditUser);
  router.delete("/api/delete-user", UserController.handleDeleteUser);
  router.get("/api/allcode", UserController.getAllCode);

  router.get("/api/top-doctor-home", DoctorController.getTopDoctorHome);
  router.get("/api/get-all-doctor", DoctorController.getAllDoctors);
  router.post("/api/save-info-doctor", DoctorController.PostInfoDoctor);
  router.get("/api/get-detail-doctor", DoctorController.getDetailDoctor);
  router.post("/api/bulk-create-schedule", DoctorController.BulkCreateSchedule);
  router.get("/api/get-schedule-doctor-bydate", DoctorController.getScheduleByDate);
  router.get("/api/get-extra-info-doctor-byId", DoctorController.getExtraInfoById);
  router.get("/api/get-profile-doctor-byId", DoctorController.getProfileDoctorById);

  router.post("/api/patient-book-appointment", PatientController.PostBookAppointment);
  router.post("/api/verify-book-appointment", PatientController.PostVerifyBookAppointment);

  router.post("/api/create-new-specialty", SpecialtyController.CreateNewSpecialty);
  router.get("/api/get-all-specialty", SpecialtyController.getAllSpecialty);

  router.post("/api/create-new-clinic", ClinicController.CreateClinic);
  router.get("/api/get-all-clinic", ClinicController.getAllClinic);
  router.get("/api/get-detail-clinic-by-id", ClinicController.getClinicById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
