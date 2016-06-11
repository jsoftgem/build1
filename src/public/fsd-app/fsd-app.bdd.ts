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
    ResponseOptions,
    ConnectionBackend
}
from "@angular/http";
import {
    MockBackend,
    MockConnection
}
from "@angular/http/testing";
import {
    Injector,
    provide,
    Component,
    ReflectiveInjector
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
        let testComponentFixture: any;

        beforeEachProviders(() => [HTTP_PROVIDERS,
            provide(XHRBackend, {
                useClass: MockBackend
            }),
            TestComponentBuilder,
            TestFsdFormComponent
        ]);
        beforeEach(inject([TestComponentBuilder], _tcb => {
            tcb = _tcb;
        }));

        describe("GIVEN: I have donor information", () => {
            let backend: MockBackend;
            let fsdDonorResourceService: FsdDonorResourceService;
            beforeEach(() => {
                let injector = ReflectiveInjector.resolveAndCreate([
                    HTTP_PROVIDERS,
                    BaseRequestOptions,
                    MockBackend,
                    FsdDonorResourceService,
                    provide(Http, {
                        useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                            return new Http(backend, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    }),
                ]);
                backend = injector.get(MockBackend);
                fsdDonorResourceService = injector.get(FsdDonorResourceService);
            });
            beforeEach(done => {
                tcb.overrideProviders(FsdDonorFormComponent, [provide(FsdDonorResourceService, { useValue: fsdDonorResourceService })])
                    .createAsync(TestFsdFormComponent)
                    .then((fixture: any) => {
                        fixture.detectChanges();
                        testComponentFixture = fixture;
                        testComponent = fixture.componentInstance;
                        fsdFormComponent = fixture.debugElement.children[0].componentInstance;
                        expect(fsdFormComponent).toBeDefined();
                        expect(testComponent).toBeDefined();
                        done();
                    });
            });
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
                    beforeEach(() => {
                        let connection: any;
                        backend.connections.subscribe((c: any) => connection = c);
                        fsdFormComponent.onSubmit();
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                status: 200,
                                body: registerDonorMockResponse
                            })
                        ));
                    });
                    it("THEN: On saved event is triggered", done => {
                        testComponent.onSaved = (response: any) => {
                            done();
                        };
                    });
                });
            });
        });
    });
    const registerDonorMockResponse = {
        donor: {
            _id: "1",
            firstName: "Jerico",
            lastName: "de Guzman",
            contactNumber: "0099 234 2345 234",
            emailAddress: "rickzx98@gmail.com",
            address: "Manila, Philippines",
            bloodGroup: "o"
        },
        donorLocation: {
            donorId: "1",
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
    directives: [FsdDonorFormComponent],
    providers: [
        HTTP_PROVIDERS,
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
            useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        })
    ]
})
export class TestFsdFormComponent {
    donor: any;
    donorLocation: any;
    onSaved(response: any) {
    }
    pointer: any;
}
