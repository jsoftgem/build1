import { bootstrap }    from "@angular/platform-browser-dynamic";
import {FsdAppComponent} from "./fsd-app/fsd-app.component";
import {HTTP_PROVIDERS} from "@angular/http";
bootstrap(FsdAppComponent, [HTTP_PROVIDERS]);