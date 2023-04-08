import { MarvelService } from 'src/app/services/marvel.service';
import { ICharacter } from './../../interfaces/ICharacter';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
    /** Character info */
    @Input() public character: ICharacter | null = null;
    /** Event emitter that is fired when the image is finished loading  */
    @Output() public onLoad = new EventEmitter<number>();
    /** Indicates if the image is currently loading or not loaded yet */
    public loading: boolean = true;
    /** Indicates if is mobile device */
    public mobileDevice: boolean = false;

    constructor(private marvelService: MarvelService, private router: Router) { }

    public ngOnInit(): void {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.mobileDevice = true;
        } else {
            this.mobileDevice = false;
        }
    }

    /**
     * Shortcut to get image src easily
     */
    public getSrc(): string {
        if (!this.character) {
            return '';
        }

        return this.marvelService.getSrc(this.character.thumbnail);
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
