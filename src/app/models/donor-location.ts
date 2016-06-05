import {DonorLocation} from "./interface";
import mongoose = require("mongoose");

let DonorLocationSchema = new mongoose.Schema({
    _donorId: {
        type: String,
        required: [true, "Donor is required"]
    },
    x: Number,
    y: Number,
    z: Number,
    latitude: Number,
    longitude: Number,
    hasM: Boolean,
    hasZ: Boolean,
    m: Number,
    sr_isWGS84: Boolean,
    sr_isWebMercator: Boolean,
    sr_isWrappable: Boolean,
    sr_latestWkid: Number,
    sr_wkid: Number
});

export = mongoose.model<DonorLocation>("donor-location", DonorLocationSchema);