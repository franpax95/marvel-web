import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PrimaryModalComponent } from '../components/modal/primary-modal/primary-modal.component';
import { IPrimaryModal } from '../interfaces/IPrimaryModal';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    /** Variable que indica si actualmente está el spinner visible */
    private loading: boolean = false;
    /** Subject para actualizar el observable */
    private loadingSub: BehaviorSubject<boolean> = new BehaviorSubject(this.loading);
    /** Observable al que suscribirse para recibir los cambios */
    public loadingObs: Observable<boolean> = this.loadingSub.asObservable();

    /** Array de las referencias a las instancias de modales */
    private modalRefs: Array<ComponentRef<PrimaryModalComponent>> = [];

    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) { }

    /**
     * Muestra u oculta el spinner de cargando
     */
    public setLoading(loading: boolean): void {
        this.loading = loading;
        this.loadingSub.next(this.loading);
    }

    /** 
     * Open a new modal with the configuration passed by parameter.
     */
    public openModal(conf: IPrimaryModal): void {
        const factory = this.resolver.resolveComponentFactory(PrimaryModalComponent);
        const componentRef: ComponentRef<PrimaryModalComponent> = factory.create(this.injector);

        componentRef.instance.level = this.modalRefs.length;
        componentRef.instance.conf = conf;
        componentRef.hostView.detectChanges();
        this.modalRefs.push(componentRef);
        
        const { nativeElement } = componentRef.location;
        this.document.body.appendChild(nativeElement);

        componentRef.instance.afterClose.subscribe(() => {
            componentRef.destroy();
            this.document.body.removeChild(nativeElement);
        });
    }

    /**
     * Cierra el último modal abierto, preservando los anteriores, en caso de que hubiera.
     */
    public closeModal(): void {
        if (this.modalRefs.length > 0) {
            const componentRef: ComponentRef<PrimaryModalComponent> = this.modalRefs.pop();
            componentRef.instance.close();
        }
    }

    /**
     * Cierra todos los modales abiertos.
     */
    public closeAllModals(): void {
        if (this.modalRefs.length > 0) {
            // Cerramos todos los modales
            for (let i = 0; i < this.modalRefs.length; i++) {
                this.modalRefs[i].instance.close();
            }

            // Reiniciamos la variable con los modales
            this.modalRefs = [];
        }
    }
}
