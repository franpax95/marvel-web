import { Directive, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Observable, Subscription } from 'rxjs';

@Directive({
    selector: '[appIntersectionObserver]',
    exportAs: 'intersection'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
    @Input() root: HTMLElement | null = null;
    @Input() rootMargin = '0px 0px 0px 0px';
    @Input() threshold = 0;
    @Input() debounceTime = 250;
    @Input() isContinuous = false;

    @Output() isIntersecting = new EventEmitter<boolean>();

    public intersecting: boolean = false;
    private subscription: Subscription;

    constructor (private element: ElementRef) {}

    public ngOnInit(): void {
        this.subscription = this.createAndObserve();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public createAndObserve () {
        const options: IntersectionObserverInit = {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
        };
    
        return new Observable<boolean>(subscriber => {
            const intersectionObserver = new IntersectionObserver(entries => {
                const { isIntersecting } = entries[0];
                subscriber.next(isIntersecting);
        
                if (isIntersecting && !this.isContinuous) {
                    intersectionObserver.disconnect();
                }
            }, options);
    
            intersectionObserver.observe(this.element.nativeElement);
    
            return ({
                unsubscribe () {
                    intersectionObserver.disconnect();
                },
            });
        })
            .pipe(debounceTime(this.debounceTime))
            .subscribe(status => {
                this.isIntersecting.emit(status);
                this.intersecting = status;
            });
    }
}
