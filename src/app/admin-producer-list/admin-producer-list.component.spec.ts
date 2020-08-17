import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProducerListComponent } from './admin-producer-list.component';

describe('AdminProducerListComponent', () => {
  let component: AdminProducerListComponent;
  let fixture: ComponentFixture<AdminProducerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProducerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProducerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
