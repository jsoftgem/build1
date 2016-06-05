import {Component, Output, EventEmitter} from "@angular/core";
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from "@angular/common";
import {AutoHeight} from "../../../commons/auto-height/auto-height.directive";
import {FsdDonorFormComponent} from "./fsd-donor-form/fsd-donor-form.component";
import {Point} from "esri";
@Component({
  selector: "fsd-sidebar",
  template: `
      <div *ngIf="active" auto-height class="fsd-sidebar-container">
        <div><a (click)="closeSidebar()" class="fsd-sidebar-close pull-right">close</a></div>   
        <div [ngSwitch]="userType" class="fsd-sidebar-form container-fluid">
          <fsd-donor-form [(pointer)]="pointer" *ngSwitchWhen="'donor'"></fsd-donor-form>
        </div>
      </div>`,
  directives: [AutoHeight, FsdDonorFormComponent, NgSwitch, NgSwitchWhen, NgSwitchDefault]
})
export class FsdSidebarComponent {
  @Output() onClose = new EventEmitter();
  @Output() onOpen = new EventEmitter();
  active: Boolean = false;
  userType: string;
  pointer: Point;
  openSidebar(pointer: Point) {
    this.active = true;
    this.pointer = pointer;
    this.onOpen.next({ userType: this.userType });
  }
  closeSidebar() {
    this.active = false;
    this.onClose.next({});
  }
}   