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

    constructor(private settings: SettingsService, private marvelService: MarvelService) { }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {}


}
