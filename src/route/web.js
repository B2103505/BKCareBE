import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/about', HomeController.getAbout);

    router.get('/crud', HomeController.getCrud);
    router.post('/post-crud', HomeController.postCrud);
    router.get('/get-crud', HomeController.displayGetCrud);

    router.get('/edit-crud', HomeController.getEditCRUD);
    router.post('/put-crud', HomeController.putCRUD);
    router.get('/delete-crud', HomeController.deleteCRUD);

    //RestApi
    router.post('/api/login', UserController.handleLogin);
    router.get('/api/get-all-user', UserController.handleGetAllUsers);
    router.post('/api/create-new-user', UserController.handleCreateNewUser);
    router.put('/api/edit-user', UserController.handleEditUser);
    router.delete('/api/delete-user', UserController.handleDeleteUser);

    router.get('/api/allcode', UserController.getAllCode);

    router.get('/api/top-doctor-home', DoctorController.getTopDoctorHome);
    return app.use("/", router);
}

module.exports = initWebRoutes;