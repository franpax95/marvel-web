import { HeaderComponent } from './../components/header/header.component';
import { ArrowLeftIcon } from './../components/icons/arrow-left.icon';
import { InfoIcon } from './../components/icons/info.icon';
import { WikiIcon } from './../components/icons/wiki.icon';
import { MarvelIcon } from './../components/icons/marvel.icon';
import { SourceLinkComponent } from './../components/source-link/source-link.component';
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
    HeaderComponent,
    PrimaryButtonComponent,
    PrimaryModalComponent,
    SpinnerComponent,
    SourceLinkComponent,
];

const icons = [
    ArrowRightIcon,
    ArrowLeftIcon,
    InfoIcon,
    MarvelIcon,
    WikiIcon,
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
