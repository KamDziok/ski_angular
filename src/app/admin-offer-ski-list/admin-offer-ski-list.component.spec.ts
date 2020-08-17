import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfferSkiListComponent } from './admin-offer-ski-list.component';

describe('AdminOfferSkiListComponent', () => {
  let component: AdminOfferSkiListComponent;
  let fixture: ComponentFixture<AdminOfferSkiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOfferSkiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOfferSkiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
