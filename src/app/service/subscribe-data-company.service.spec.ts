import { TestBed } from '@angular/core/testing';

import { SubscribeDataCompanyService } from './subscribe-data-company.service';

describe('SubscribeDataCompanyService', () => {
  let service: SubscribeDataCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeDataCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
