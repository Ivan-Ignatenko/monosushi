import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { ActionInfoComponent } from './action-info/action-info.component';
import { ActionService } from '../../shared/services/action/action.service';

const routes: Routes = [
  {
    path: '', component: ActionsComponent
  },
  {
    path: ':id', component: ActionInfoComponent, resolve: {
      actionInfo: ActionService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
