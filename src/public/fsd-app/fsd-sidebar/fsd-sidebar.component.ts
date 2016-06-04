import {Component} from "@angular/core";
import {AutoHeight} from "../../commons/auto-height/auto-height.directive";
import {FsdSidebarService} from "./fsd-sidebar.service";

@Component({
    selector: "fsd-sidebar",
    template : `
      <div *ngIf="fsdSideBarService.isOpen()" auto-height class="fsd-sidebar-container"></div>`,
    directives: [AutoHeight],
    providers: [FsdSidebarService]
})
export class FsdSidebarComponent {
  public fsdSideBarService: FsdSidebarService;
  constructor(private fsdSidebar: FsdSidebarService) { this.fsdSideBarService = this.fsdSidebar; }
} 