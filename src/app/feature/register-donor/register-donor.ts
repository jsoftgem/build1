import {CreateDonor} from "./conrol/create-donor";
import {CreateDonorLocation} from "./conrol/create-donor-location";
import {RegisterDonorDTO} from "./register-donor.dto";
import {Donor, DonorLocation} from "../../models/interface";

export class RegisterDonor {
    register(registerDonorDTO: RegisterDonorDTO, callback: (err: any, registerDonorCallBack?: RegisterDonorDTO) => void) {
        new CreateDonor().execute(registerDonorDTO.getDonor(), (err, donor) => {
            if (err) {
                callback(err);
            } else {
                let persistedRegisterDTO: RegisterDonorDTO = new RegisterDonorDTO();
                persistedRegisterDTO.setDonor(donor);
                registerDonorDTO.getDonorLocation()._donorId = donor.id;
                new CreateDonorLocation().execute(registerDonorDTO.getDonorLocation(), (err, donorLocation) => {
                    if (err) {
                        callback(err);
                    } else {
                        persistedRegisterDTO.setDonorLocation(donorLocation);
                        callback(err, persistedRegisterDTO);
                    }
                });
            }
        });
    }
}