import {Component} from "@angular/core";
import {UserSelectionComponent} from "./user-selection/user-selection.component";
import {FsdMapComponent} from "./fsd-map/fsd-map.component";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router-deprecated";
@Component({
    selector: "fsd-app",
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, UserSelectionComponent, FsdMapComponent],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    {
        path: "/select-type",
        name: "SelectType",
        component: UserSelectionComponent,
        useAsDefault: true
    },
    {
        path: "/fsd-map",
        name: "FsdMap",
        component: FsdMapComponent
    }
])
export class FsdAppComponent { }