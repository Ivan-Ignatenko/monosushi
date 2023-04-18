import { TestBed } from '@angular/core/testing';
import { ActionService } from './action.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IActionResponse } from '../../interfaces/action/action.interface';

describe('ActionService', () => {
  let service: ActionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ActionService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of actions', () => {
    const FAKE_ACTIONS: Array<IActionResponse> = [{
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    }];
    service.getAll().subscribe((response) => {
      expect(response).toBe(FAKE_ACTIONS);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/actions');
    expect(req.request.method).toBe('GET');
    req.flush(FAKE_ACTIONS);
  })

  it('should return one action', () => {
    const FAKE_ACTION: IActionResponse = {
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    };
    service.getOne(1).subscribe(action => {
      expect(action).toBe(FAKE_ACTION);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/actions/1');
    expect(req.request.method).toBe('GET');
    req.flush(FAKE_ACTION);
  })

  it('should create an action', () => {
    const FAKE_ACTION: IActionResponse = {
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    };
    service.createAction(FAKE_ACTION).subscribe(action => {
      expect(action).toEqual(FAKE_ACTION);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/actions');
    expect(req.request.method).toBe('POST');
    req.flush(FAKE_ACTION);
  });

  it('should delete an action', () => {
    const FAKE_ID = 1;
    service.deleteAction(FAKE_ID).subscribe(() => {
      expect().nothing();
    });
    const req = httpTestingController.expectOne('http://localhost:3000/actions/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update an action', () => {
    const FAKE_ACTION: IActionResponse = {
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    };
    const FAKE_ID = 1;
    service.updateAction(FAKE_ACTION, FAKE_ID).subscribe(action => {
      expect(action).toEqual(FAKE_ACTION);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/actions/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(FAKE_ACTION);
  })
});
