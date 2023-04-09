import { SpinnerComponent } from './../components/spinner/spinner.component';
import { ComicCarouselComponent } from './../components/comic-carousel/comic-carousel.component';
import { ComicCardComponent } from './../components/comic-card/comic-card.component';
import { PrimaryModalComponent } from '../components/modal/primary-modal/primary-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from 'src/app/components/primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';
import { ArrowRightIcon } from '../components/icons/arrow-right.icon';
import { CarouselModule } from 'primeng/carousel';

const modules = [
    /** Components Modules Here */
    CardComponent,
    ComicCardComponent,
    ComicCarouselComponent,
    PrimaryButtonComponent,
    PrimaryModalComponent,
    SpinnerComponent,
];

const icons = [
    ArrowRightIcon
];


@NgModule({
    declarations: [...icons, ...modules],
    imports: [
        CommonModule,
        FormsModule,
        CarouselModule,
    ],
    exports: [...icons, ...modules],
})
export class ComponentsModule { }
