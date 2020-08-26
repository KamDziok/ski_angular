import { TestBed } from '@angular/core/testing';

import { SubscribeDataAdminService } from './subscribe-data-admin.service';

describe('SubscribeDataAdminService', () => {
  let service: SubscribeDataAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeDataAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
