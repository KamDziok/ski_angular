import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegiCompanyComponent } from './form-regi-company.component';

describe('FormRegiCompanyComponent', () => {
  let component: FormRegiCompanyComponent;
  let fixture: ComponentFixture<FormRegiCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegiCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegiCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
