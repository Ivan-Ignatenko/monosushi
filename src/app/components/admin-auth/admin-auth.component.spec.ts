import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';
import { ToastrService } from 'ngx-toastr';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [AdminAuthComponent],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
