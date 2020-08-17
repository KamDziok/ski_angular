import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchOfferSkiComponent } from './serch-offer-ski.component';

describe('SerchOfferSkiComponent', () => {
  let component: SerchOfferSkiComponent;
  let fixture: ComponentFixture<SerchOfferSkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerchOfferSkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchOfferSkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
