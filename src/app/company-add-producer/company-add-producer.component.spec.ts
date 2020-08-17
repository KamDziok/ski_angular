import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddProducerComponent } from './company-add-producer.component';

describe('CompanyAddProducerComponent', () => {
  let component: CompanyAddProducerComponent;
  let fixture: ComponentFixture<CompanyAddProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAddProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
