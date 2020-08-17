import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationUserListComponent } from './admin-notification-user-list.component';

describe('AdminNotificationUserListComponent', () => {
  let component: AdminNotificationUserListComponent;
  let fixture: ComponentFixture<AdminNotificationUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
