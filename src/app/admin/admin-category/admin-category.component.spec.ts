import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { of } from 'rxjs';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let service: CategoryService;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [AdminCategoryComponent],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: service, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set adminCategories after calling getCategories()', () => {
    const FAKE_CATEGORIES: ICategoryResponce[] = [{
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    }];
    spyOn(service, 'getAll').and.returnValue(of(FAKE_CATEGORIES));
    component.getCategories();
    expect(component.adminCategories).toEqual(FAKE_CATEGORIES);
  });

  it('should call categoryService.getAll() when getCategories() is called', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getCategories();
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should leave adminCategories empty if getAll() returns an empty array', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getCategories();
    expect(component.adminCategories).toEqual([]);
  });

  it('should delete a category', () => {
    const FAKE_CATEGORY: ICategoryResponce = {
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    };
    spyOn(service, 'deleteCategory').and.returnValue(of());
    component.deleteCategory(FAKE_CATEGORY);
    expect(service.deleteCategory).toHaveBeenCalledWith(FAKE_CATEGORY.id);
  });

  it('should toggle addCategoryStatus', () => {
    expect(component.addCategoryStatus).toBe(false);
    component.addCategory();
    expect(component.addCategoryStatus).toBe(true);
    component.addCategory();
    expect(component.addCategoryStatus).toBe(false);
  });
});
