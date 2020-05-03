import { TestBed } from '@angular/core/testing';

import { YtpmService } from './ytpm.service';

describe('YtpmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YtpmService = TestBed.get(YtpmService);
    expect(service).toBeTruthy();
  });
});
