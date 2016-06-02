import {Component} from "@angular/core";
import {Router} from "@angular/router-deprecated";
@Component({
    selector: "user-selection",
    template: `
        <div class="user-selection">
            <div class="container-fluid user-selection-container-container">
                <h4>I am going to</h4>
                <div>
                <button type="button" class="btn" (click)="goToMap('donor')">donate blood</button>
                <button type="button" class="btn" (click)="goToMap('patient')">look for donors</button>
                </div>
            </div>
        </div>
    `
})
export class UserSelectionComponent {
    constructor(private router: Router) { }

    goToMap(userType: string) {
        this.router.root.navigate(["FsdMap", { userType: userType }]);
    }
}