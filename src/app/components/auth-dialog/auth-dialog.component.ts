import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { Router } from '@angular/router';

import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, setDoc, Firestore } from '@angular/fire/firestore';
import { AccountService } from 'src/app/shared/services/account/account.service';

export interface IRegister {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmationPassword?: string;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {

  public authForm!: FormGroup;
  public registerForm!: FormGroup;

  private registerData!: IRegister;

  public isRegister = false;
  public checkPassword = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmationPassword: [null, Validators.required]
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully logged in');
      this.authForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/user-profile']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password } = this.registerForm.value;
    this.registerData = this.registerForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      this.registerForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async emailSignUp(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };
    await setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  showRegisterModal(): void {
    this.isRegister = !this.isRegister;
  }

  checkConfirmedPassword(): void{
  this.checkPassword = this.password.value === this.confirmed.value;
  if(this.password.value !== this.confirmed.value){
    this.registerForm.controls['confirmationPassword'].setErrors({
      matchError: 'The password does not match'
    })
  }
  }

  get password(): AbstractControl{
    return this.registerForm.controls['password'];
  }

  get confirmed(): AbstractControl{
    return this.registerForm.controls['confirmationPassword'];
  }

  checkVisibilityError(control: string, nameError: string): boolean | null{
    return this.registerForm.controls[control].errors?.[nameError];
  }
}
