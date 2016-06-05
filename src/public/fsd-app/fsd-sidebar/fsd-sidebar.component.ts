import {Component, OnInit} from "@angular/core";
import {AutoHeight} from "../../commons/auto-height/auto-height.directive";
import {FsdSidebarService} from "./fsd-sidebar.service";

@Component({
  selector: "fsd-sidebar",
  template: `
      <div auto-height class="fsd-sidebar-container">
        <a (click)="closeSidebar()" class="fsd-sidebar-close pull-right">close</a>
        <div class="fsd-sidebar-form container-fluid">
        
        </div>
      </div>`,
  directives: [AutoHeight],
  providers: [FsdSidebarService]
})
export class FsdSidebarComponent implements OnInit {
  constructor(public fsdSidebar: FsdSidebarService) { }
  closeSidebar() { this.fsdSidebar.closeSidebar(); }
}  