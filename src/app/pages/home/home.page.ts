import { ICharacter } from './../../interfaces/ICharacter';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';
import { SettingsService } from 'src/app/services/settings.service';
import { getPromise } from 'src/app/utils';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    /** Search */
    public search: string = '';

    /** Collection of characters */
    public characters: Array<any> = [];
    /** Subscription to characters */
    public charactersSubscription!: Subscription;

    constructor(private settings: SettingsService, private marvelService: MarvelService) { }

    public ngOnInit(): void {
        this.charactersSubscription = this.marvelService.charactersObs.subscribe(characters => {
            this.characters = characters;
            // console.dir(characters);
        });

        console.dir('Pedimos página');
        this.marvelService.addCharactersPage();
    }

    public ngOnDestroy(): void {}

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
        const htmlDOM: HTMLElement | null = document.querySelector('.empty');
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

    /**
     * Manejador de eventos del botón para lanzar modales anidados
     */
    public onModalOpen(): void {
        /**
         * Ejemplo de display de modales anidados.
         */
        this.settings.openModal({
            title: 'Primer Modal',
            content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit rutrum sapien id tempor. Cras.'],
            onAccept: () => {
                this.settings.openModal({
                    title: 'Segundo Modal',
                    content: ['Modal de pruebas'],
                    onAccept: () => this.settings.closeAllModals(),
                    onCancel: () => {}
                });

                // Necesario para no cerrar el modal que intentamos abrir de inmediato
                return false;
            },
            onCancel: () => {
                this.settings.openModal({
                    title: 'Modal de Cancelación',
                    content: ['Has cancelado el modal de pruebas correctamente'],
                    onAccept: () => this.settings.closeAllModals(),
                });

                return false;
            }
        });
    }
}
