import express from "express";
import HomeController from "../controllers/HomeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/about', HomeController.getAbout);

    router.get('/home', (req, res) => {
        return res.send('Home page coming soon');
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;