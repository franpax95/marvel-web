import { IntersectionObserverDirective } from './../directives/intersection-observer.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ComponentsModule
    ],
    exports: [],
})
export class MainModule { }
