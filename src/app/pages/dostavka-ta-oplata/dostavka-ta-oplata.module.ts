import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DostavkaTaOplataRoutingModule } from './dostavka-ta-oplata-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DostavkaTaOplataComponent } from './dostavka-ta-oplata.component';

@NgModule({
  declarations: [
    DostavkaTaOplataComponent
  ],
  imports: [
    CommonModule,
    DostavkaTaOplataRoutingModule,
    SharedModule
  ]
})
export class DostavkaTaOplataModule { }
