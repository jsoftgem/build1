import {Component, OnInit} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {LocationService} from "../services/location.service";
import {ArgcisMapService} from "../services/arcgis-map.service";
@Component({
    selector: "fsd-map",
    template: `
        <div class="fsd-map">
        
        <div>
    `,
    providers: [LocationService, ArgcisMapService]
})
export class FsdMapComponent implements OnInit {
    constructor(private params: RouteParams, private locationService: LocationService, private arcgisMapService: ArgcisMapService) { }
    ngOnInit() {
        return this.locationService.getLocation({ timeout: 10000 }).subscribe((position) => {
            console.log("position", position);
            this.arcgisMapService.createMap({
                basemap: "streets",
                container: "div.fsd-map"
            });
        });
    }
}    