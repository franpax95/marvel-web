import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    /** 'Click' event emitter for 'Get Started' button click */
    @Output() public onClick = new EventEmitter<MouseEvent>();

    constructor() {}

    /**
     * 'Click' event handler to emit to parent
     */
    public onHeaderClick(event: MouseEvent): void {
        this.onClick.emit(event);
    }
}
