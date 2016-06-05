import mongoose = require("mongoose");
export interface Donor extends mongoose.Document {
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    bloodGroup: string;
    id?: string;
}

export interface DonorLocation extends mongoose.Document {
    _donorId?: any;
    x: Number;
    y: Number;
    z: Number;
    latitude: Number;
    longitude: Number;
    hasM: Boolean;
    hasZ: Boolean;
    m: Number;
    sr_isWGS84: Boolean;
    sr_isWebMercator: Boolean;
    sr_isWrappable: Boolean;
    sr_latestWkid: Number;
    sr_wkid: Number;
}