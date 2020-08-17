import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportNotificationUserComponent } from './support-notification-user.component';

describe('SupportNotificationUserComponent', () => {
  let component: SupportNotificationUserComponent;
  let fixture: ComponentFixture<SupportNotificationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportNotificationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportNotificationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
