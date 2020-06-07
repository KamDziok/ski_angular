import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitListComponent } from './admin-unit-list.component';

describe('AdminUnitListComponent', () => {
  let component: AdminUnitListComponent;
  let fixture: ComponentFixture<AdminUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
