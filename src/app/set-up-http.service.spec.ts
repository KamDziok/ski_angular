import { TestBed } from '@angular/core/testing';

import { SetUpHttpService } from './set-up-http.service';

describe('SetUpHttpService', () => {
  let service: SetUpHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetUpHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
