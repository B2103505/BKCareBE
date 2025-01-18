import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/ViewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8088; // PORT undefine => port = 8088  //need line require('dotenv').config(); to run process.env

app.listen(port, () => {
    console.log("Backend running on port :"+port);
})
