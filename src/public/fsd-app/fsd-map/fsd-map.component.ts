import {Component, OnInit} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {LocationService} from "../services/location.service";
import {ArgcisMapService} from "../services/arcgis-map.service";
import {AutoHeight} from "../../commons/auto-height/auto-height.directive";
import {FsdSidebarService} from "../fsd-sidebar/fsd-sidebar.service";
import {Point} from "esri";
@Component({
    selector: "fsd-map",
    template: `
        <div auto-height id="fsdMap" class="fsd-map"></div>
    `,
    directives: [AutoHeight],
    providers: [LocationService, ArgcisMapService, FsdSidebarService]
})
export class FsdMapComponent implements OnInit {
    constructor(private params: RouteParams, private locationService: LocationService, private arcgisMapService: ArgcisMapService, private fsdSidebarService: FsdSidebarService) { }
    ngOnInit() {
        this.fsdSidebarService.closeSidebar();
        this.fsdSidebarService.userType = this.params.userType;
        let resultMap: any = this.arcgisMapService.createMap({
            basemap: "osm",
            container: "fsdMap"
        });
        resultMap.view.on("click", (pointer: Point) => {
            this.fsdSidebarService.openSidebar();
            this.arcgisMapService.createSelectedLocationMark(resultMap.view, pointer);
        });
        this.arcgisMapService.createSearch(resultMap.view);
        this.arcgisMapService.createTrack(resultMap.view);
        this.arcgisMapService.createCompass(resultMap.view);
        return this.locationService.getLocation({ timeout: 10000 }).subscribe((location: any) => {
            this.arcgisMapService.goToLocation([location.coords.longitude, location.coords.latitude], resultMap.view, (response: any) => {
                this.arcgisMapService.createCurrentLocation(response.target, resultMap.view);
            });
        });
    }
    routerCanDeactivate() {
        this.fsdSidebarService.closeSidebar();
    }
}    