import {Directive, ElementRef, Input, OnInit} from "@angular/core";

@Directive({
    selector: "[auto-height]",
    host: {
        "(window:resize)": "onResize($event)"
    }
})
export class AutoHeight implements OnInit {
    @Input("offset") offset: string;
    private _window: Window = window;
    private el: HTMLElement;
    private elQuery: any;
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        this.elQuery = $(el.nativeElement);
    }
    onResize($event: Event) {
        this.resize();
    }
    private resize() {
        if (this.offset) {
            this.elQuery.height((this._window.innerHeight - this.offset));
        } else {
            this.elQuery.height(this._window.innerHeight);
        }
    }
    ngOnInit() {
        this.resize();
    }
}