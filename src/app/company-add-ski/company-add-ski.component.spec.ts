import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddSkiComponent } from './company-add-ski.component';

describe('CompanyAddSkiComponent', () => {
  let component: CompanyAddSkiComponent;
  let fixture: ComponentFixture<CompanyAddSkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAddSkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddSkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
