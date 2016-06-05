import {Injectable} from "@angular/core";
import {Map, MapView, Search, GraphicsLayer, Point, SimpleMarkerSymbol,
    Graphic, TextSymbol, Track, Compass, PictureMarkerSymbol, StreamLayer} from "esri";
@Injectable()
export class ArgcisMapService {
    private indicatorGraphicsLayer: GraphicsLayer = new GraphicsLayer();
    createMap(opts: any, userType: string): { map: Map, view: MapView } {
        let map = new Map({
            basemap: opts.basemap,
        });
        let mapView = new MapView({
            container: opts.container,
            map: map,
            scale: 2400
        });
        if (userType === "donor") {
            map.add(this.indicatorGraphicsLayer);
        }
        return {
            map: map,
            view: mapView
        };
    }
    createSearch(view: MapView) {
        let searchWidget = new Search({
            view: view
        });
        view.ui.add(searchWidget, {
            position: "top-left",
            index: 0
        });
    }
    createCurrentLocation(current, view: MapView) {
        let _geometry = current.targetGeometry;
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
        view.graphics.add(pointGraphic);
        view.graphics.add(textGraphic);
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
    createCompass(view: MapView) {
        let compassWidget = new Compass({
            view: view
        });
        view.ui.add(compassWidget, {
            position: "top-left",
            index: 2
        });
    }
    createSelectedLocationMark(map: Map, pointer: Point) {
        this.indicatorGraphicsLayer.removeAll();
        let pictureMarkerSymbol = new PictureMarkerSymbol({
            url: "assets/icons/map_component_icon_blood.png",
            width: "24px",
            height: "24px"
        });
        let markerSymbol = new SimpleMarkerSymbol({
            color: [226, 119, 40],
            outline: {
                color: [255, 255, 255],
                width: 2
            }
        });
        let pictureGraphic = new Graphic({
            geometry: pointer.mapPoint,
            symbol: pictureMarkerSymbol
        });
        this.indicatorGraphicsLayer.add(pictureGraphic);
    }
    goToLocation(coordinates: Number[], view: MapView, callBack: any) {
        view.goTo({
            target: coordinates,
            scale: view.scale
        }).then(callBack);
    }
    clearIndicatorGraphicsLayer() {
        this.indicatorGraphicsLayer.removeAll();
    }
}