import {Component, OnInit} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {LocationService} from "../services/location.service";
import {ArgcisMapService} from "../services/arcgis-map.service";
import {AutoHeight} from "../../commons/auto-height/auto-height.directive";
@Component({
    selector: "fsd-map",
    template: `
        <div auto-height id="fsdMap" class="fsd-map"></div>
    `,
    directives: [AutoHeight],
    providers: [LocationService, ArgcisMapService]
})
export class FsdMapComponent implements OnInit {
    constructor(private params: RouteParams, private locationService: LocationService, private arcgisMapService: ArgcisMapService) { }
    ngOnInit() {
        return this.locationService.getLocation({ timeout: 10000 }).subscribe((location: any) => {
            console.log("position", location);
            let resultMap: any = this.arcgisMapService.createMap({
                basemap: "osm",
                container: "fsdMap"
            });
            this.arcgisMapService.createSearch(resultMap.view);
            this.arcgisMapService.createTrack(resultMap.view);
            this.arcgisMapService.createCompass(resultMap.view);
            this.arcgisMapService.goToLocation([location.coords.longitude, location.coords.latitude], resultMap.view, (response: any) => {
                this.arcgisMapService.createCurrentLocation(response.target, resultMap.map);
            });
        });
    }
}    