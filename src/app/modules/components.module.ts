import { IntersectionObserverDirective } from './../directives/intersection-observer.directive';
import { PrimaryModalComponent } from '../components/modal/primary-modal/primary-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from 'src/app/components/primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';
import { ArrowRightIcon } from '../components/icons/arrow-right.icon';

const modules = [
    /** Components Modules Here */
    CardComponent,
    PrimaryButtonComponent,
    PrimaryModalComponent,
];

const icons = [
    ArrowRightIcon
];


@NgModule({
    declarations: [...icons, ...modules],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [...icons, ...modules],
})
export class ComponentsModule { }
