import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportNotificationCompanyComponent } from './support-notification-company.component';

describe('SupportNotificationCompanyComponent', () => {
  let component: SupportNotificationCompanyComponent;
  let fixture: ComponentFixture<SupportNotificationCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportNotificationCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportNotificationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
