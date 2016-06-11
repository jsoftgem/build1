import {
    Http,
    Headers
}
from "@angular/http";
import {
    Injectable
}
from "@angular/core";
@Injectable()
export class FsdDonorResourceService {
    constructor(http: Http) {}
    register(registerDonorInput: any, callback: (err: any, response?: any) => void) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json;charset=utf-8");
        return http.post("fsd/api/register-donor", JSON.stringify(registerDonorInput), headers)
            .subscribe(res => callback(undefined, res), err => callback(err));
    };
}