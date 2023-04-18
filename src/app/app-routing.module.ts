import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin-auth',
    loadChildren: () => import('./components/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'dostavka-ta-oplata',
    loadChildren: () => import('./pages/dostavka-ta-oplata/dostavka-ta-oplata.module').then(m => m.DostavkaTaOplataModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'product/:category',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
