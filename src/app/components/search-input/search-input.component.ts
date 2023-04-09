import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent {
    /** NgModel */
    @Input() public value: string = '';
    /** NgModelChange emitter  */
    @Output() public onChange = new EventEmitter<string>();

    constructor() { }

    /**
     * 'Change' event handler for NgModelChange
     */
    public onInputChange(value: string): void {
        this.onChange.emit(value);
    }
}
