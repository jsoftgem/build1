import {
    Http,
    Headers,
    RequestOptions
}
from "@angular/http";
import {
    Injectable
}
from "@angular/core";
@Injectable()
export class FsdDonorResourceService {
    constructor(private http: Http) {
    }
    register(registerDonorInput: any, callback: (err: any, response?: any) => void) {
        this.http.post("fsd/api/register-donor", JSON.stringify(registerDonorInput), new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json;charset=UTF-8"
            })
        })).subscribe(res => callback(undefined, res), err => callback(err));
    };
}