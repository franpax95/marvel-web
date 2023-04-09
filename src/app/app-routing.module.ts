import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.page.module').then(m => m.HomeModule),
        canActivate: [],
        data: { animationState: 'List' },
    },
    {
        path: ':id',
        loadChildren: () => import('./pages/details/details.page.module').then(m => m.DetailsModule),
        canActivate: [],
        data: { animationState: 'Details' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
