import {
    FsdDonor,
    FsdDonorImpl,
    FsdDonorLocation,
    FsdDonorFormComponent
}
from "./fsd-map/fsd-sidebar/fsd-donor-form/fsd-donor-form.component";
import {
    async,
    beforeEach,
    describe,
    expect,
    inject,
    injectAsync,
    TestComponentBuilder,
    beforeEachProviders
}
from "@angular/core/testing";
import {
    Http,
    BaseRequestOptions,
    Response,
    XHRBackend
}
from "@angular/http";
import {
    MockBackend,
    MockConnection,
    ResponseOptions
}
from "@angular/http/testing";
import {
    Injector,
    provide
}
from "@angular/core";


export function main() {
    describe("Create donor BDD", () => {
        let donor: FsdDonor;
        let donorLocation: FsdDonorLocation;
        let pointer: any = {};
        let fsdFormComponent: FsdDonorFormComponent;
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
                    pointer.mapPoint = {};
                    pointer.mapPoint.spatialReference = {};
                    pointer.mapPoint.x = 1;
                    pointer.mapPoint.y = 2;
                    pointer.mapPoint.z = 4;
                    pointer.mapPoint.latitude = 123.32;
                    pointer.mapPoint.longitude = 923.2;
                });
                describe("WHEN: submitting successfully", () => {
                    beforeEachProviders(() => {
                        return [XHRBackend,
                            provide(XHRBackend, {
                                useClass: MockBackend
                            })
                        ];
                    });
                    beforeEach(injectAsync([XHRBackend], (mockBackend) => {
                        mockBackend.connections.subscribe(
                            (connection: MockConnection) => {
                                new ResponseOptions({
                                    body: [registerDonorMockResponse]
                                });
                                console.log("Create Donor BDD", "beforeEach");
                            });
                    }));
                    it("THEN: Donor is return with object id", injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                        return tcb.createAsync(FsdDonorFormComponent).
                        then(fixture => {
                            fsdFormComponent = fixture.componentInstance;
                            fsdFormComponent.donor = donor;
                            fsdFormComponent.pointer = pointer;
                            fsdFormComponent.onSubmit();
                            fsdFormComponent.onSaved.subscribe(res => {
                                console.log("onSave", res);
                                expect(res).toBeDefined();
                            });
                            console.log("Create Donor BDD", "onSubmit");
                            expect(fsdFormComponent).toBeDefined();
                        });
                    }));
                });
            });
        });
    });
    const registerDonorMockResponse = {
        donor: {
            firstName: "Jerico",
            lastName: "de Guzman",
            contactNumber: "0099 234 2345 234",
            emailAddress: "rickzx98@gmail.com",
            address: "Manila, Philippines",
            bloodGroup: "o"
        },
        donorLocation: {
            x: 1,
            y: 2,
            z: 10,
            hasZ: true,
            latitude: 1234.23,
            longitude: 234.32
        }
    };
}
