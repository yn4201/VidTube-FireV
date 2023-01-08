import { TestBed } from '@angular/core/testing';

import { CloudMessageService } from './cloud-message.service';

describe('CloudMessageService', () => {
  let service: CloudMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
