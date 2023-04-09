import { IComicSummary } from './../../interfaces/IComicSummary';
import { MarvelService } from 'src/app/services/marvel.service';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { IComic } from 'src/app/interfaces/IComic';

@Component({
    selector: 'app-comic-card',
    templateUrl: './comic-card.component.html',
    styleUrls: ['./comic-card.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class ComicCardComponent implements OnChanges {
    /** Character info */
    @Input() public comic: IComicSummary | null = null;
    /** Event emitter that is fired when the image is finished loading  */
    @Output() public onLoad = new EventEmitter<number>();

    /** Indicates if the image is currently loading or not loaded yet */
    public loading: boolean = true;
    /** Current comic loaded base on the comic summary (this.comic) */
    public current: IComic | null = null;

    constructor(private marvelService: MarvelService) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['comic']) {
            const { currentValue: comic } = changes['comic'];
            this.marvelService.getComic(comic.resourceURI)
                .then((full: IComic) => (this.current = full));
        }
    }

    /**
     * Shortcut to get image src easily
     */
    public getSrc(): string {
        if (!this.current) {
            return '';
        }

        return this.marvelService.getSrc(this.current.thumbnail);
    }

    /**
     * 'Load' event handler. 
     * Notify the parent that the image is loaded to change loading status.
     */
    public onImageLoaded(event: Event): void {
        this.loading = false;
    }
}
