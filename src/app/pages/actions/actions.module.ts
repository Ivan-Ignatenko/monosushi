import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsRoutingModule } from './actions-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsComponent } from './actions.component';
import { ActionInfoComponent } from './action-info/action-info.component';

@NgModule({
  declarations: [
    ActionsComponent,
    ActionInfoComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    SharedModule
  ]
})
export class ActionsModule { }
