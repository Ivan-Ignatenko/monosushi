import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminAuthComponent } from './admin-auth.component';

@NgModule({
  declarations: [
    AdminAuthComponent
  ],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    SharedModule
  ]
})
export class AdminAuthModule { }
