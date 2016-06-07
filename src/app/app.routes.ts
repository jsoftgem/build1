import {RegisterDonor} from "./feature/register-donor/register-donor.route";

export function AppRoutes(app) {
    new RegisterDonor(app);
}