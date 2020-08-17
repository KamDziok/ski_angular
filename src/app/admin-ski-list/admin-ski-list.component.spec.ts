import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkiListComponent } from './admin-ski-list.component';

describe('AdminSkiListComponent', () => {
  let component: AdminSkiListComponent;
  let fixture: ComponentFixture<AdminSkiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSkiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSkiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
