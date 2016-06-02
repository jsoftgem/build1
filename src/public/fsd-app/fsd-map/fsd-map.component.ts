import {Component, OnInit} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {LocationService} from "../location.service";
@Component({
    selector: "fsd-map",
    template: `
    `,
    providers: [LocationService]
})
export class FsdMapComponent implements OnInit {
    constructor(private params: RouteParams, private locationService: LocationService) { }
    ngOnInit() {
        return this.locationService.getLocation().subscribe( (position) => { console.log('position', position) });
    }
}    