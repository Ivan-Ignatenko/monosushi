import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { CallbackDialogComponent } from "../callback-dialog/callback-dialog.component";

const showCloseMenu = trigger('showCloseMenu', [
  state('show', style({
    opacity: 1,
    transform: 'translate(0px, 0%)',
  })),
  state('close', style({
    opacity: 0,
    transform: 'translate(0px, -100%)',
  })),
  transition('show => close', [animate('0.5s ease-in')]),
  transition('close => show', [animate('0.5s ease-out')])
]);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [showCloseMenu]
})
export class HeaderComponent {

  public basket: IProductResponce[] = [];
  public total: number = 0;
  public totalCount = 0;
  public loginPage!: string;

  public status = false;
  public modalStatus = false;
  public isLogin = false;
  public emptyBasket = true;

  public loginSubscription!: Subscription;

  public authForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initAuthForm();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  showCloseMenu(): void {
    this.status = !this.status;
  }

  showModal(): void {
    this.modalStatus = !this.modalStatus;
    if (this.basket.length > 0) {
      this.emptyBasket = false;
    }
  }

  closeModal(): void {
    this.modalStatus = !this.modalStatus;
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponce) => total + prod.count * prod.price, 0);
  }

  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponce) => total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  showLoginModal(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      autoFocus: false
    });
  }

  showCallbackModal(): void {
    this.dialog.open(CallbackDialogComponent, {
      backdropClass: 'dialog-back',
      autoFocus: false
    })
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginPage = 'User';
    } else if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginPage = 'Admin';
    } else {
      this.isLogin = false;
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    });
  }

  productCount(product: IProductResponce, value: boolean): void {
    if (value) {
      product.count++;
    } else if (!value && product.count > 1) {
      product.count--;
    }
  }
}
