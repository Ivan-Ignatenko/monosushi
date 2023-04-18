import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackDialogComponent } from './callback-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CallbackDialogComponent', () => {
  let component: CallbackDialogComponent;
  let fixture: ComponentFixture<CallbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ CallbackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
