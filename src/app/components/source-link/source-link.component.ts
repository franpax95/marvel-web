import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IUrl } from 'src/app/interfaces/IUrl';

@Component({
    selector: 'app-source-link',
    templateUrl: './source-link.component.html',
    styleUrls: ['./source-link.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SourceLinkComponent {
    /** Possible Url Types */
    public readonly types: { [key: string]: string; } = {
        ['COMIC']: 'comiclink',
        ['DETAILS']: 'detail',
        ['WIKI']: 'wiki',
    };

    /** URL info */
    @Input() public url: IUrl | null = null;
    
    constructor() {}
}
