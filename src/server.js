import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/ViewEngine";
import initWebRoutes from "./route/web";
import connectdb from "./config/ConnectDB";
// import cors from 'cors';

require('dotenv').config();
let app = express();
// app.use(cors({ credentials: true, origin: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectdb();

let port = process.env.PORT || 8088; // PORT undefine => port = 8088  //need line require('dotenv').config(); to run process.env

app.listen(port, () => {
    console.log("Backend running on port :" + port);
})
