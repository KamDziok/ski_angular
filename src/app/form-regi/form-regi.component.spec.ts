import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegiComponent } from './form-regi.component';

describe('FormRegiComponent', () => {
  let component: FormRegiComponent;
  let fixture: ComponentFixture<FormRegiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
