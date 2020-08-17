import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransactionListComponent } from './admin-transaction-list.component';

describe('AdminTransactionListComponent', () => {
  let component: AdminTransactionListComponent;
  let fixture: ComponentFixture<AdminTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
