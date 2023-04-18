import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProductResponce } from '../../interfaces/product/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of actions', () => {
    const FAKE_PRODUCTS: Array<IProductResponce> = [
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
    ];
    service.getAll().subscribe((response) => {
      expect(response).toBe(FAKE_PRODUCTS);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(FAKE_PRODUCTS);
  });

  it('should return one action', () => {
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
    }
    service.getOne(1).subscribe(action => {
      expect(action).toBe(FAKE_PRODUCT);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(FAKE_PRODUCT);
  });

  it('should create a product', () => {
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
    service.createProduct(FAKE_PRODUCT).subscribe(product => {
      expect(product).toEqual(FAKE_PRODUCT);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    req.flush(FAKE_PRODUCT);
  });

  it('should delete a product', () => {
    const FAKE_ID = 1;
    service.deleteProduct(FAKE_ID).subscribe(() => {
      expect().nothing();
    });
    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a product', () => {
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
    const FAKE_ID = 1;
    service.updateProduct(FAKE_PRODUCT, FAKE_ID).subscribe(product => {
      expect(product).toEqual(FAKE_PRODUCT);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(FAKE_PRODUCT);
  })
});
