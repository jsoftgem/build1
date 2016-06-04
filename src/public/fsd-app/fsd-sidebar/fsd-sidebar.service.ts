import {Injectable} from "@angular/core";

@Injectable()
export class FsdSidebarService {
   private fsdSidebarSelector: string = "fsd-sidebar";
   private fsdSidebarElement: any = $(this.fsdSidebarSelector);
   private animationEnd: string = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
   private open: boolean = false;

   isOpen(): boolean {
      return this.open;
   }

   openSidebar() {
     this.open = true;
   }

   closeSidebar() {
     this.open = false;
   }
}