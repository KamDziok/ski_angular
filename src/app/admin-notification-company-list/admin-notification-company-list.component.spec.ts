import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationCompanyListComponent } from './admin-notification-company-list.component';

describe('AdminNotificationCompanyListComponent', () => {
  let component: AdminNotificationCompanyListComponent;
  let fixture: ComponentFixture<AdminNotificationCompanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationCompanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
