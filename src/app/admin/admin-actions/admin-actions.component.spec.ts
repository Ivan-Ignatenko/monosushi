import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from './admin-actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { IActionResponse } from '../../shared/interfaces/action/action.interface';
import { ActionService } from '../../shared/services/action/action.service';
import { of } from 'rxjs';

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let service: ActionService;
  let fixture: ComponentFixture<AdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [AdminActionsComponent],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: service, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ActionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set adminActions after calling getActions()', () => {
    const FAKE_ACTIONS: IActionResponse[] = [{
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    }];
    spyOn(service, 'getAll').and.returnValue(of(FAKE_ACTIONS));
    component.getActions();
    expect(component.adminActions).toEqual(FAKE_ACTIONS);
  });

  it('should call actionService.getAll() when getActions() is called', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getActions();
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should leave adminActions empty if getAll() returns an empty array', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getActions();
    expect(component.adminActions).toEqual([]);
  });

  it('should delete an action', () => {
    const FAKE_ACTION: IActionResponse = {
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    };
    spyOn(service, 'deleteAction').and.returnValue(of());
    component.deleteAction(FAKE_ACTION);
    expect(service.deleteAction).toHaveBeenCalledWith(FAKE_ACTION.id);
  });
});
