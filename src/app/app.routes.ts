import {RegisterDonor} from "./feature/register-donor/register-donor.route";

export class AppRoutes {
    constructor(private app: any) {
        new RegisterDonor(app);
    }
}