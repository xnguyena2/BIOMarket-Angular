import { TestBed } from '@angular/core/testing';

import { DeviceconfigService } from './deviceconfig.service';

describe('DeviceconfigService', () => {
  let service: DeviceconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
