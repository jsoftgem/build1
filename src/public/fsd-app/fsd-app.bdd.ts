import {FsdDonor, FsdDonorImpl, FsdDonorLocation} from "./fsd-map/fsd-sidebar/fsd-donor-form/fsd-donor-form.component";
import {
    async,
    beforeEach,
    describe,
    expect,
    inject,
    it
} from "@angular/core/testing";
export function main() {
    describe("Create donor BDD", () => {
        let donor: FsdDonor;
        let donorLocation: FsdDonorLocation;
        describe("GIVEN: I have donor information", () => {
            beforeEach(() => {
                donor = new FsdDonorImpl();
                donor.firstName.model = "Jerico";
                donor.lastName.model = "de Guzman";
                donor.contactNumber.model = "0099 234 2345 234";
                donor.emailAddress.model = "rickzx98@gmail.com";
                donor.address.model = "Manila, Philippines";
                donor.bloodGroup.model = "o";
            });
            describe("GIVEN: I have donor location", () => {
                beforeEach(() => {
                    donorLocation = new FsdDonorLocation();
                    donorLocation.x = 1;
                    donorLocation.y = 2;
                    donorLocation.z = 4;
                    donorLocation.latitude = 123.32;
                    donorLocation.longitude = 923.2;
                });
                it("should build without a problem", () => { });
            });
        });
    });
}
