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
    long: Number,
    lat: Number
});

export = mongoose.model<DonorLocation>("donor-location", DonorLocationSchema);