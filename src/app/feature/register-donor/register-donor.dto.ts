import {Donor, DonorLocation} from "../../models/interface";
export class RegisterDonorDTO {
    private donor: Donor;
    private donorLocation: DonorLocation;

    setDonor(donor: Donor) {
        this.donor = donor;
    }
    getDonor() {
        return this.donor;
    }
    setDonorLocation(donorLocation: DonorLocation) {
        this.donorLocation = donorLocation;
    }
    getDonorLocation() {
        return this.donorLocation;
    }
}