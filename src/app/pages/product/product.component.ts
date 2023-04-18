import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private eventSubscription!: Subscription;

  public products: IProductResponce[] = [];
  
  public ctgName!: string;
  public sorting = false;


  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.eventSubscription = this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.getProducts();
      }
    })
  }

  ngOnInit(): void {}

  getProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).then(data => {
      this.products = data as IProductResponce[];
      this.ctgName = data[0].category.name;
      if(this.ctgName === 'Роли'){
        this.sorting = true;
      } else {
        this.sorting = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  productCount(product: IProductResponce, value: boolean): void{
    if(value){
      product.count ++;
    } else if (!value && product.count > 1){
      product.count --;
    }
  }

  addToBasket(product: IProductResponce): void{
    let basket: IProductResponce[] = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
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
