import {Component, OnInit, ViewChild} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {LocationService} from "../services/location.service";
import {ArgcisMapService} from "../services/arcgis-map.service";
import {AutoHeight} from "../../commons/auto-height/auto-height.directive";
import {FsdSidebarComponent} from "./fsd-sidebar/fsd-sidebar.component";
import {Point} from "esri";
@Component({
    selector: "fsd-map",
    template: `
        <div>
            <div auto-height id="fsdMap" class="fsd-map">
            </div>
            <fsd-sidebar (onClose)="onSidebarClose($event)"></fsd-sidebar>
        </div>
    `,
    directives: [AutoHeight, FsdSidebarComponent],
    providers: [LocationService, ArgcisMapService]
})
export class FsdMapComponent implements OnInit {
    @ViewChild(FsdSidebarComponent) fsdSidebar: FsdSidebarComponent;
    constructor(private routeParams: RouteParams, private locationService: LocationService, private arcgisMapService: ArgcisMapService) { }
    ngOnInit() {
        let resultMap: any = this.arcgisMapService.createMap({
            basemap: "osm",
            container: "fsdMap"
        }, this.routeParams.params.userType);
        resultMap.view.on("click", (pointer: Point) => {
            this.fsdSidebar.openSidebar(pointer);
            this.arcgisMapService.createSelectedLocationMark(resultMap.map, pointer);
        });
        return resultMap.view.then(() => {
            this.fsdSidebar.userType = this.routeParams.params.userType;
            this.arcgisMapService.createSearch(resultMap.view);
            this.arcgisMapService.createTrack(resultMap.view);
            this.arcgisMapService.createCompass(resultMap.view);
            this.locationService.getLocation({ timeout: 10000 }).subscribe((location: any) => {
                this.arcgisMapService.goToLocation([location.coords.longitude, location.coords.latitude], resultMap.view, (response: any) => {
                    this.arcgisMapService.createCurrentLocation(response.target, resultMap.view);
                });
            });
        });
    }
    routerCanDeactivate() {
        this.fsdSidebar.closeSidebar();
    }
    onSidebarClose() {
        this.arcgisMapService.clearIndicatorGraphicsLayer();
    }
}