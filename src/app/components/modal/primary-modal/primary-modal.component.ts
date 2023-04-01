import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { IPrimaryModal } from 'src/app/interfaces/IPrimaryModal';
import { SettingsService } from 'src/app/services/settings.service';
import { Modal } from '../modal';

@Component({
    selector: 'primary-modal',
    templateUrl: './primary-modal.component.html',
    styleUrls: ['./primary-modal.component.scss']
})
export class PrimaryModalComponent extends Modal implements AfterContentInit {
    /** Component Classname */
    public override readonly CLASSNAME: string = 'PrimaryModalComponent';
    /** Modal configuration object passed by service */
    @Input() public conf: IPrimaryModal;
    /** Depth (z-index) of the modal */
    @Input() public level: number = 0;

    constructor(
        private settings: SettingsService,
        protected override cd: ChangeDetectorRef,
        protected override host: ElementRef<HTMLElement>, 
    ) {
        super(cd, host);
    }

    public ngAfterContentInit(): void {
        setTimeout(() => {
            const acceptBtn: HTMLButtonElement | null = <HTMLButtonElement> document.getElementById(`primary-modal-success-btn-${this.level}`);
            const cancelBtn: HTMLButtonElement | null = <HTMLButtonElement> document.getElementById(`primary-modal-danger-btn-${this.level}`);
            const defaultBtn: HTMLButtonElement | null = <HTMLButtonElement> document.getElementById(`primary-modal-default-btn-${this.level}`);

            if (defaultBtn) {
                defaultBtn.focus();
            } else if (acceptBtn) {
                acceptBtn.focus();
            } else if (cancelBtn) { 
                cancelBtn.focus();
            }
        }, 100);
    }

    /**
     * Manejador de eventos de 'Aceptar'.
     * Ejecuta el callback 'onAccept' y cierra el modal si éste va bien.
     */
    public onAcceptClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        // Si se pasa callback y devuelve 'true', cierra el modal.
        if (this.conf && this.conf.onAccept !== undefined) {
            const success: boolean | void = this.conf.onAccept();
            if (success !== false) {
                this.settings.closeModal();
            }
        } else {
            this.settings.closeModal();
        }
    }

    /**
     * Manejador de eventos de 'Cancelar'.
     * Ejecuta el callback 'onCancel' y cierra el modal si éste va bien.
     */
    public onCancelClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        // Si se pasa callback y devuelve 'true', cierra el modal.
        if (this.conf && this.conf.onCancel !== undefined) {
            const success: boolean | void = this.conf.onCancel();
            if (success !== false) {
                this.settings.closeModal();
            }
        } else {
            this.settings.closeModal();
        }
    }

    /**
     * Manejador de eventos del botón por defecto.
     * Cierra el modal.
     */
    public onDefaultClick(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.settings.closeModal();
    }
}
