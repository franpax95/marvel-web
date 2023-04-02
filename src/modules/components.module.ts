import { PrimaryModalComponent } from './../app/components/modal/primary-modal/primary-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from 'src/app/components/primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';

const modules = [
    /** Components Modules Here */
    PrimaryButtonComponent,
    PrimaryModalComponent,
];

@NgModule({
    declarations: [...modules],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [...modules],
})
export class ComponentsModule { }
