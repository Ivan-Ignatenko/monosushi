import { Component } from '@angular/core';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public actions: IActionResponse[] = [];

  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
    this.getActions();
  }

  getActions(): void {
    this.actionService.getAll().subscribe(data => {
      this.actions = data as IActionResponse[];
    })
  }
}
