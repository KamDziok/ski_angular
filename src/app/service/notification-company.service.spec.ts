import { TestBed } from '@angular/core/testing';

import { NotificationCompanyService } from './notification-company.service';

describe('NotificationCompanyService', () => {
  let service: NotificationCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
