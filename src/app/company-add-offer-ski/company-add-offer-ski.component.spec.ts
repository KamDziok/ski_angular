import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddOfferSkiComponent } from './company-add-offer-ski.component';

describe('CompanyAddOfferSkiComponent', () => {
  let component: CompanyAddOfferSkiComponent;
  let fixture: ComponentFixture<CompanyAddOfferSkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAddOfferSkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddOfferSkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
