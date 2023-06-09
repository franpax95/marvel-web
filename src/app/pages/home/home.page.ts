import { ICharacter } from './../../interfaces/ICharacter';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    /** Search */
    public search: string = '';
    /** Collection of characters */
    public characters: Array<ICharacter> = [];
    /** Subscription to characters */
    public charactersSubscription!: Subscription;
    /** Subscription to search */
    public searchSubscription!: Subscription;

    constructor(private settings: SettingsService, private marvelService: MarvelService) { }

    public ngOnInit(): void {
        this.charactersSubscription = this.marvelService.charactersObs.subscribe((characters: Array<ICharacter>) => {
            this.characters = characters;
        });

        this.searchSubscription = this.marvelService.searchObs.subscribe((search: string) => {
            this.search = search;
        });

        this.marvelService.addCharactersPage();
    }

    public ngOnDestroy(): void {
        if (this.charactersSubscription) {
            this.charactersSubscription.unsubscribe();
        }

        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    }

    /**
     * Add a character page if intersecting
     */
    public isIntersecting (status: boolean): void {
        if (!this.characters.some((character: ICharacter) => (character === null))) {
            this.marvelService.addCharactersPage();
        }
    }

    /**
     * Scroll to the init of the character list
     */
    public onHeaderClick(event: MouseEvent): void {
        const htmlDOM: HTMLElement | null = document.querySelector('.search-container');
        if (htmlDOM) {
            htmlDOM.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * 'Change' event handler for search input
     */
    public onChange(search: string): void {
        this.marvelService.setSearch(search);
    }
}
