import {
    FsdDonor,
    FsdDonorImpl,
    FsdDonorLocation,
    FsdDonorFormComponent
}
from "./fsd-map/fsd-sidebar/fsd-donor-form/fsd-donor-form.component";
import {
    FsdDonorResourceService
}
from "./services/fsd-donor-resource.service";
import {
    beforeEach,
    describe,
    expect,
    inject,
    injectAsync,
    it,
    beforeEachProviders
}
from "@angular/core/testing";
import {
    TestComponentBuilder
}
from "@angular/compiler/testing";
import {
    Http,
    BaseRequestOptions,
    Response,
    XHRBackend,
    Headers,
    HTTP_PROVIDERS,
    Response
}
from "@angular/http";
import {
    MockBackend
}
from "@angular/http/testing";
import {
    Injector,
    provide,
    Component
}
from "@angular/core";
import {
    getDOM
}
from "@angular/platform-browser/src/dom/dom_adapter";
export function main() {
    describe("Create donor BDD", () => {
        let donor: FsdDonor;
        let donorLocation: FsdDonorLocation;
        let pointer: any = {};
        let fsdFormComponent: FsdDonorFormComponent;
        let testComponent: TestFsdFormComponent;
        let tcb: TestComponentBuilder;
        beforeEachProviders(() => [HTTP_PROVIDERS,
            provide(XHRBackend, {
                useClass: MockBackend
            }),
            TestComponentBuilder,
            FsdDonorResourceService,
            FsdDonorFormComponent,
            TestFsdFormComponent
        ]);
        beforeEach(inject([TestComponentBuilder], _tcb => {
            tcb = _tcb;
        }));

        beforeEach(done => {
            tcb.createAsync(TestFsdFormComponent)
                .then((fixture: any) => {
                    fixture.detectChanges();
                    testComponent = fixture.componentInstance;
                    fsdFormComponent = fixture.debugElement.children[0].componentInstance;
                    expect(fsdFormComponent).toBeDefined();
                    expect(testComponent).toBeDefined();
                    done();
                });
        });
        describe("GIVEN: I have donor information", () => {
            beforeEach(() => {
                donor = new FsdDonorImpl();
                donor.firstName.model = "Jerico";
                donor.lastName.model = "de Guzman";
                donor.contactNumber.model = "0099 234 2345 234";
                donor.emailAddress.model = "rickzx98@gmail.com";
                donor.address.model = "Manila, Philippines";
                donor.bloodGroup.model = "o";
                fsdFormComponent.donor = donor;
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
                    fsdFormComponent.pointer = pointer;
                });
                describe("WHEN: submitting successfully", () => {
                    beforeEach((done) => {
                        testComponent.onSaved = (response) => {
                            console.log("response", response);
                            done();
                        };
                        fsdFormComponent.onSubmit();
                    });
                    it("THEN: Donor is return with object id", () => {});
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

@Component({
    selector: "test-fsd-form",
    template: `<fsd-donor-form (onSaved)="onSaved($event)" [(pointer)]="pointer"></fsd-donor-form>`,
    directives: [FsdDonorFormComponent]
})

export class TestFsdFormComponent {
    onSaved(response: any) {}
    pointer: any;
}
