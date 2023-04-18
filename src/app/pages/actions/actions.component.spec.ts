import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { of } from 'rxjs';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let service: ActionService;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ ActionsComponent ],
      providers: [
        { provide: service, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ActionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set actions after calling getActions()', () => {
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
    expect(component.actions).toEqual(FAKE_ACTIONS);
  });

  it('should call actionService.getAll() when getActions() is called', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getActions();
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should leave actions empty if getAll() returns an empty array', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getActions();
    expect(component.actions).toEqual([]);
  });
});
