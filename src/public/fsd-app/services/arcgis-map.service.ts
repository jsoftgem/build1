import {Injectable} from "@angular/core";
import {Map, MapView} from "esri";
@Injectable()
export class ArgcisMapService {

    createMap(options: any) {
        let map = new Map({
            basemap: options.basemap
        });

        let mapView = new MapView({
            container: options.container,
            map: map
        });
    }
}