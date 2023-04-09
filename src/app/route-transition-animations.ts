import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
    transition('Details => List', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [style({ left: '-10%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('.2s linear', style({ left: '10%', opacity: 0 }))]),
            query(':enter', [animate('.2s linear', style({ left: '0%', opacity: 1 }))])
        ]),
        query(':enter', animateChild())
    ]),
    transition('List => Details', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
            })
        ]),
        query(':enter', [style({ right: '-10%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('.2s linear', style({ right: '10%', opacity: 0 }))]),
            query(':enter', [animate('.2s linear', style({ right: '0%', opacity: 1 }))])
        ]),
        query(':enter', animateChild())
    ]),
]);
