import { DetailsRoutingModule } from './details-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/modules/components.module';
import { DetailsPage } from './details.page';

@NgModule({
    imports: [
        CommonModule,
        DetailsRoutingModule,
        FormsModule,
        ComponentsModule,
    ],
    declarations: [DetailsPage],
})
export class DetailsModule {}
