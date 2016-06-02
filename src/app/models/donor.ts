import mongoose = require("mongoose");
import regex = require("../util/regex");
import {Regex} from "../util/regex";
import {Donor} from "./interface";
let reg = new Regex();
let DonorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."]
    },
    contactNumber: {
        type: String,
        validate: {
            validator: function (contactNumber) {
                return reg.contact.test(contactNumber);
            },
            message: "{VALUE} is not a valid contact number"
        },
        required: [true, "Contact number is required."]
    },
    emailAddress: {
        type: String,
        validate: {
            validator: function (emailAddress) {
                return reg.email.test(emailAddress);
            },
            messsage: "{VALUE} is not a valid email address."
        },
        required: [true, "Email address is required."]
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood group is required."]
    }
});
export = mongoose.model<Donor>("donor", DonorSchema);