import { ChangeDetectorRef, ElementRef, EventEmitter, Inject, Output } from "@angular/core";


@Inject({})
export class Modal {
    /** Trigger translate CSS keyframe in out animation */
    protected readonly ANIMATION_TRANSLATE_OUT: string = 'ModalTranslateOut';
    /** Trigger opacity CSS keyframe in out animation */
    protected readonly ANIMATION_FADE_OUT: string = 'ModalFadeOut';
    /** Component Classname */
    public readonly CLASSNAME: string = 'PrimaryModalComponent';

    /** Dispara un evento cuando se ha terminado la animación de salida, en el método 'animationDone' */
    @Output() public afterClose = new EventEmitter();

    constructor(protected cd: ChangeDetectorRef, protected host: ElementRef<HTMLElement>) { }

    public get container(): HTMLElement {
        return this.host.nativeElement.querySelector(`.${this.CLASSNAME}`) as HTMLElement;
    }

    public get modal(): HTMLElement {
        return this.host.nativeElement.querySelector(`.${this.CLASSNAME} .modal`) as HTMLElement;
    }

    /**
     * 'animationDone' event handler.
     * Emit the afterClose event to indicate the service to destroy the component.
     */
    public animationDone(event: AnimationEvent): void {
        if (event.animationName === this.ANIMATION_FADE_OUT) {
            this.afterClose.emit(true);
        }
    }

    /**
     * Activate the close animation.
     * When it ends, 'animationDone' event is triggered.
     */
    public close(): void {
        this.modal.style.animation = `${this.ANIMATION_TRANSLATE_OUT} .3s`;
        this.container.style.animation = `${this.ANIMATION_FADE_OUT} .4s`;
    }

    /**
     * Shortcut de 'this.cd.detectChanges()'.
     * Force component to render.
     */
    protected apply(delay: number = 0): void {
        setTimeout(() => this.cd.detectChanges(), delay);
    }
}