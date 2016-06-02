import DonorLocationDAO = require("../../../models/donor-location");
import {DonorLocation} from "../../../models/interface";
export class CreateDonorLocation {
    execute(data: DonorLocation, callback: (err: any, result: DonorLocation) => void) {
        new DonorLocationDAO(data).save(callback);
    }
}
