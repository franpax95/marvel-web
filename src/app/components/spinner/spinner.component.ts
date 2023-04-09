import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    /** Spinner additional CSS classes */
    @Input() public className: string = '';
    /** Spinner additional styles */
    @Input() public styles: any = {};

    constructor() {}
}
