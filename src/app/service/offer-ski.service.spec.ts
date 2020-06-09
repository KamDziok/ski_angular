import { TestBed } from '@angular/core/testing';

import { OfferSkiService } from './offer-ski.service';

describe('OfferSkiService', () => {
  let service: OfferSkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferSkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
