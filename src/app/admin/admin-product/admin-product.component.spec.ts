import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { of } from 'rxjs';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let service: ProductService;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [AdminProductComponent],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: service, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set adminProducts after calling getProducts()', () => {
    const FAKE_PRODUCTS: IProductResponce[] = [{
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
    spyOn(service, 'getAll').and.returnValue(of(FAKE_PRODUCTS));
    component.getProducts();
    expect(component.adminProducts).toEqual(FAKE_PRODUCTS);
  });

  it('should call productService.getAll() when getProducts() is called', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getProducts();
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should leave adminProducts empty if getAll() returns an empty array', () => {
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getProducts();
    expect(component.adminProducts).toEqual([]);
  });

  it('should delete a product', () => {
    const FAKE_PRODUCT: IProductResponce = {
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
    spyOn(service, 'deleteProduct').and.returnValue(of());
    component.deleteProduct(FAKE_PRODUCT);
    expect(service.deleteProduct).toHaveBeenCalledWith(FAKE_PRODUCT.id);
  });
});
