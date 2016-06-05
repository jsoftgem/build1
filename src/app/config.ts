import path = require("path");

export class Database {
    url: string = "mongodb://127.0.0.1:27017/bloodDonorDB";
    testUrl: string = "mongodb://127.0.0.1:27017/bloodDonorDBTest";
    murl: string = "mongodb://fsd:fsd>@ds017231.mlab.com:17231/fsd";
    mtestUrl: string = "mongodb://fsd:fsd@ds037283.mlab.com:37283/fsd_test";
}

export class Index {
    app_assets: string = path.join(__dirname, "..", "..", "assets");
    app_js: string = path.join(__dirname, "..", "..", "dist", "public");
    app_css: string = path.join(__dirname, "..", "..", "dist", "public");
    vendor_js: string = path.join(__dirname, "..", "..", "dist", "vendor");
    vendor_css: string = path.join(__dirname, "..", "..", "dist", "vendor");
    vendor_font: string = path.join(__dirname, "..", "..", "dist", "vendor");
    html: string = path.join(__dirname, "..", "..", "index.html");
    system_config: string = path.join(__dirname, "..", "..", "config", "system.config.js");
    system_angular: string = path.join(__dirname, "..", "..", "node_modules", "@angular");
    system_angular2_in_memory_web_api: string = path.join(__dirname, "..", "..", "node_modules", "angular2-in-memory-web-api");
    system_rxjs: string = path.join(__dirname, "..", "..", "node_modules", "rxjs");
}