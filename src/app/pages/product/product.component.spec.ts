import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should increment product count if value is true', () => {
    const FAKE_PRODUCT = {
      id: 1,
      category: {
        id: 2,
        name: 'string',
        path: 'string',
        imagePath: 'string',
      },
      name: 'string',
      path: 'string',
      ingredients: 'string',
      weight: 10,
      price: 10,
      imagePath: 'string',
      count: 2,
    };
    const value = true;
    component.productCount(FAKE_PRODUCT, value);
    expect(FAKE_PRODUCT.count).toEqual(3);
  });

  it('should decrement product count if value is false and count is greater than 1', () => {
    const FAKE_PRODUCT = {
      id: 1,
      category: {
        id: 2,
        name: 'string',
        path: 'string',
        imagePath: 'string',
      },
      name: 'string',
      path: 'string',
      ingredients: 'string',
      weight: 10,
      price: 10,
      imagePath: 'string',
      count: 2,
    };
    const value = false;
    component.productCount(FAKE_PRODUCT, value);
    expect(FAKE_PRODUCT.count).toEqual(1);
  });

  it('should not decrement product count if value is false and count is 1', () => {
    const FAKE_PRODUCT = {
      id: 1,
      category: {
        id: 2,
        name: 'string',
        path: 'string',
        imagePath: 'string',
      },
      name: 'string',
      path: 'string',
      ingredients: 'string',
      weight: 10,
      price: 10,
      imagePath: 'string',
      count: 1,
    };
    const value = false;
    component.productCount(FAKE_PRODUCT, value);
    expect(FAKE_PRODUCT.count).toEqual(1);
  });
});
