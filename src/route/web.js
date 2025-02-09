import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";
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

    router.post('/api/login', UserController.handleLogin);
    router.get('/api/get-all-user',UserController.handleGetAllUsers);


    // router.get('/home', (req, res) => {
    //     return res.send('Home page coming soon');
    // });

    return app.use("/", router);
}

module.exports = initWebRoutes;