import { Component } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import Swiper, { Navigation } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  public rolls: IProductResponce[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getRolls();
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 2,
    });
  }

  getRolls(): void {
    this.productService.getAllRolls('rolls').then(data => {
      this.rolls = data;
    })
  }

  productCount(product: IProductResponce, value: boolean): void {
    if (value) {
      product.count++;
    } else if (!value && product.count > 1) {
      product.count--;
    }
  }

  addToBasket(product: IProductResponce): void {
    let basket: IProductResponce[] = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
}
