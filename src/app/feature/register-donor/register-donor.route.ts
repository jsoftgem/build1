import {RegisterDonorDTO} from "./register-donor.dto";
import {RegisterDonor} from "./register-donor";

export function RegisterDonor(app) {
    app.post("/fsd/api/register-donor", (req, res) => {
        let reqData = req.body;
        let registerDonorDto: RegisterDonorDTO = new RegisterDonorDTO();
        let registerDonor: RegisterDonor = new RegisterDonor();
        if (!reqData.donor || !reqData.donorLocation) {
            res.status(500).send({ error: "Donor and DonorLocation objects are required." });
        } else {
            registerDonorDto.setDonor(reqData.donor);
            registerDonorDto.setDonorLocation(reqData.donorLocation);
            registerDonor.register(registerDonorDto, (err, result) => {
                if (err) {
                    res.status(500).send({ error: err });
                } else {
                    res.send(result);
                }
            });

        }
    });
}