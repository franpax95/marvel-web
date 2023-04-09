import { IComicList } from './../../interfaces/IComicList';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-comic-carousel',
    templateUrl: './comic-carousel.component.html',
    styleUrls: ['./comic-carousel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ComicCarouselComponent {
    /** Comic collection */
    @Input() public comics: IComicList | null = null;

    constructor() {}
}
