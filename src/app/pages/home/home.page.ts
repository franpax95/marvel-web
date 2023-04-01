import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

    constructor(private settings: SettingsService) { }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {}

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
