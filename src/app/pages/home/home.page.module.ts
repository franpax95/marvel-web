import { IntersectionObserverDirective } from './../../directives/intersection-observer.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/modules/components.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ComponentsModule,
    ],
    declarations: [HomePage, IntersectionObserverDirective],
})
export class HomeModule {}
