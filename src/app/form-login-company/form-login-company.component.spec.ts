import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginCompanyComponent } from './form-login-company.component';

describe('FormLoginCompanyComponent', () => {
  let component: FormLoginCompanyComponent;
  let fixture: ComponentFixture<FormLoginCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoginCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
