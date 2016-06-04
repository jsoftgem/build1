import {Injectable} from "@angular/core";
import {Map, MapView, Search, GraphicsLayer, Point, SimpleMarkerSymbol,
    Graphic, TextSymbol, Track, Compass} from "esri";
@Injectable()
export class ArgcisMapService {
    createSearch(view: MapView) {
        let searchWidget = new Search({
            view: view
        });
        view.ui.add(searchWidget, {
            position: "top-left",
            index: 0
        });
    }
    createCurrentLocation(current, map: Map) {
        let _geometry = current.targetGeometry;
        let graphicsLayer = new GraphicsLayer();
        let point = new Point({
                x: _geometry.x,
                y: _geometry.y,
                z: _geometry.z
            }),
            markerSymbol = new SimpleMarkerSymbol({
                color: [226, 119, 40],
                outline: {
                    color: [255, 255, 255],
                    width: 2
                }
            }),
            textSymbol = new TextSymbol({
                color: "black",
                haloColor: "blue",
                haloSize: "1px",
                text: "You are here",
                xoffset: 3,
                yoffset: 7,
                font: {  // autocast as esri/symbols/Font
                    size: 11,
                    family: "sans-serif",
                    weight: "bolder"
                }
            });
        let pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
        }), textGraphic = new Graphic({
            geometry: point,
            symbol: textSymbol
        });
        graphicsLayer.add(pointGraphic);
        graphicsLayer.add(textGraphic);
        map.add(graphicsLayer);
        map.reorder();
    }
    createTrack(view: MapView) {
        let trackWidget = new Track({
            view: view
        });
        view.ui.add(trackWidget, {
            position: "top-left",
            index: 1
        });
    }
    createMap(opts: any): {map: Map, view: MapView} {
        let map = new Map({
            basemap: opts.basemap
        });
        let mapView = new MapView({
            container: opts.container,
            map: map,
            scale: 2400
        });
        return {
            map: map,
            view: mapView
        };
    }
    createCompass(view: MapView) {
        let compassWidget = new Compass({
            view: view
        });
        view.ui.add(compassWidget, {
            position: "top-left",
            index: 2
        });
    }
    goToLocation(coordinates: Number[], view: MapView, callBack: any) {
        view.goTo({
            target: coordinates,
            scale: view.scale
        }).then(callBack);
    }
}