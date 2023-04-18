import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderService } from 'src/app/shared/services/order/order.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let service: OrderService;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: service, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change total', () => {
    const FAKE_BASKET = [{
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
    }];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

  it('should change count', () => {
    const FAKE_BASKET = [{
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
    }];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalCount').and.callThrough();
    component.getTotalCount();
    expect(component.getTotalCount).toHaveBeenCalled();
    expect(component.totalCount).toBe(2);
    component.basket = [];
    component.getTotalCount();
    expect(component.getTotalCount).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

  it('should toggle status', () => {
    expect(component.status).toBe(false);
    component.showCloseMenu();
    expect(component.status).toBe(true);
    component.showCloseMenu();
    expect(component.status).toBe(false);
  });

  it('should toggle modalStatus', () => {
    expect(component.modalStatus).toBe(false);
    component.closeModal();
    expect(component.modalStatus).toBe(true);
    component.closeModal();
    expect(component.modalStatus).toBe(false);
  });

  it('should toggle modalStatus', () => {
    expect(component.modalStatus).toBe(false);
    component.showModal();
    expect(component.modalStatus).toBe(true);
    component.showModal();
    expect(component.modalStatus).toBe(false);
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

  it('should update basket when changeBasket event is emitted', () => {
    spyOn(component, 'loadBasket');
    service.changeBasket.next(true);
    expect(component.loadBasket).toHaveBeenCalled();
  });
});

