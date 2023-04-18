import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserProfileComponent } from './user-profile.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    PersonalDataComponent,
    OrderHistoryComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule
  ]
})
export class UserProfileModule { }
