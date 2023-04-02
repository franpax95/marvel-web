import { ICharacter } from './../../interfaces/ICharacter';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardComponent {
    /** Character info */
    @Input() public character: ICharacter | null = null;
    /** Event emitter that is fired when the image is finished loading  */
    @Output() public onLoad = new EventEmitter<number>();
    /** Indicates if the image is currently loading or not loaded yet */
    public loading: boolean = true;

    constructor(private router: Router) { }

    /**
     * Shortcut to get image src easily
     */
    public getSrc(): string {
        if (!this.character) {
            return '';
        }

        return `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
    }

    /**
     * 'Click' event handler. Navigate to character details.
     */
    public onClick(event: MouseEvent): void {
        if (this.character) {
            this.router.navigateByUrl(`/${this.character.id}`);
        }
    }

    /**
     * 'Load' event handler. 
     * Notify the parent that the image is loaded to change loading status.
     */
    public onImageLoaded(event: Event): void {
        // console.dir(event);
        this.loading = false;

        // if (this.character) {
        //     this.onLoad.emit(this.character.id);
        // }
    }
}
