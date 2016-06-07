import DonorDAO = require("../../../models/donor");
import {Donor} from "../../../models/interface";
export class CreateDonor {
    execute(data: Donor, callback: (err: any, result: Donor) => void) {
        new DonorDAO(data).save(callback);
    }
}