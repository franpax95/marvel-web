import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICharacter } from './../../interfaces/ICharacter';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';
import { SettingsService } from 'src/app/services/settings.service';
import { getPromise } from 'src/app/utils';

@Component({
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit, OnDestroy {
    /** Transition duration for hide screen (ms) */
    public readonly HIDE_DURATION: number = 250; // ms

    /** The character loaded */
    public character: ICharacter | null = null;
    /** Hide screen while detail is loading */
    public hide: boolean = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private marvelService: MarvelService,
        private router: Router,
        private settings: SettingsService, 
    ) { }

    public ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const id: number = Number(paramMap.get('id'));
            this.hide = true;

            this.marvelService.getCharacter(id).then((character: ICharacter | null) => {
                if (character) {
                    setTimeout(() => this.character = character, this.HIDE_DURATION);
                } else {
                    this.router.navigateByUrl('/');
                }
            });
        });
    }

    public ngOnDestroy(): void {}

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
     * 'Load' event handler.
     * Show the screen when the image is loaded.
     */
    public onImageLoaded(event: Event): void {
        this.hide = false;
    }
}
