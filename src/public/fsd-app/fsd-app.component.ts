import {Component} from "@angular/core";
import {UserSelectionComponent} from "./user-selection/user-selection.component";
import {FsdMapComponent} from "./fsd-map/fsd-map.component";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router-deprecated";
import {FsdSidebarComponent} from "./fsd-sidebar/fsd-sidebar.component";
@Component({
    selector: "fsd-app",
    template: `
        <router-outlet></router-outlet>
        <fsd-sidebar></fsd-sidebar>,
    `,
    directives: [ROUTER_DIRECTIVES, FsdSidebarComponent],
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
export class FsdAppComponent {
    selectedUser: string;
}