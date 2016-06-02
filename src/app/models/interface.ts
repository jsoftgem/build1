import mongoose = require("mongoose");
export interface Donor extends mongoose.Document {
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    bloodGroup: string;
}

export interface DonorLocation extends mongoose.Document {
    _donorId: any;
    x: Number;
    y: Number;
    z: Number;
    long: Number;
    lat: Number;
}