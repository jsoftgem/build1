import {Injectable} from "@angular/core";

@Injectable()
export class FsdSidebarService {
  private fsdSidebarSelector: string = "fsd-sidebar .fsd-sidebar-container";
  private animationEnd: string = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
  private open: boolean = false;

  isOpen(): boolean {
    return this.open;
  }

  openSidebar() {
    $(this.fsdSidebarSelector).css("display", "block");
  }

  closeSidebar() {
    $(this.fsdSidebarSelector).css("display", "none");
  }
}