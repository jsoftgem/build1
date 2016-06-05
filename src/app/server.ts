import express = require("express");
import mongoose = require("mongoose");
import morgan = require("morgan");
import bodyParser = require("body-parser");
import {Database, Index} from "./config";
import path = require("path");
import {AppRoutes} from "./app.routes";
import request = require("request");
const app = express();
let db = new Database();
let index = new Index();

const PORT = process.env.port || 3000;
mongoose.connect(db.url);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.listen(PORT, () => {
    console.log("listening on PORT" + PORT);
});
// Index
app.use("/vendor/js", express.static(index.vendor_js));
app.use("/vendor/css", express.static(index.vendor_css));
app.use("/font", express.static(index.vendor_font));
app.use("/js", express.static(index.app_js));
app.use("/css", express.static(index.app_css));
app.use("/system.config.js", express.static(index.system_config));
app.use("/assets", express.static(index.app_assets));
app.get("/fsd", (req, res) => {
    res.sendFile(index.html);
});

app.use("/@angular", express.static(index.system_angular));
app.use("/angular2-in-memory-web-api", express.static(index.system_angular2_in_memory_web_api));
app.use("/rxjs", express.static(index.system_rxjs));
new AppRoutes(app);
export = app;