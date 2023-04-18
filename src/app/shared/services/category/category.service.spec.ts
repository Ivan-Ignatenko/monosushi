import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICategoryResponce } from '../../interfaces/category/category.interface';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of categories', () => {
    const FAKE_CATEGORIES: Array<ICategoryResponce> = [{
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    }];
    service.getAll().subscribe((response) => {
      expect(response).toBe(FAKE_CATEGORIES);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('GET');
    req.flush(FAKE_CATEGORIES);
  })

  it('should create a category', () => {
    const FAKE_CATEGORY: ICategoryResponce = {
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    };
    service.createCategory(FAKE_CATEGORY).subscribe(category => {
      expect(category).toEqual(FAKE_CATEGORY);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('POST');
    req.flush(FAKE_CATEGORY);
  });

  it('should delete a category', () => {
    const FAKE_ID = 1;
    service.deleteCategory(FAKE_ID).subscribe(() => {
      expect().nothing();
    });
    const req = httpTestingController.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a category', () => {
    const FAKE_CATEGORY: ICategoryResponce = {
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    };
    const FAKE_ID = 1;
    service.updateCategory(FAKE_CATEGORY, FAKE_ID).subscribe(category => {
      expect(category).toEqual(FAKE_CATEGORY);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(FAKE_CATEGORY);
  })
});
