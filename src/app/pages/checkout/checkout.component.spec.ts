import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { OrderService } from 'src/app/shared/services/order/order.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let service: OrderService;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: service, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change total', () => {
    const FAKE_BASKET = [
      {
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
      }
    ]
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

  it('should update basket when changeBasket event is emitted', () => {
    spyOn(component, 'loadBasket');
    service.changeBasket.next(true);
    expect(component.loadBasket).toHaveBeenCalled();
  });
});
