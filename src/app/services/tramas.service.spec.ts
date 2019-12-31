import { TestBed } from '@angular/core/testing';

import { TramasService } from './tramas.service';

describe('TramasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TramasService = TestBed.get(TramasService);
    expect(service).toBeTruthy();
  });
});
