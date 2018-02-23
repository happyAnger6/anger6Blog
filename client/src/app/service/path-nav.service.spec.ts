import { TestBed, inject } from '@angular/core/testing';

import { PathNavService } from './path-nav.service';

describe('PathNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathNavService]
    });
  });

  it('should be created', inject([PathNavService], (service: PathNavService) => {
    expect(service).toBeTruthy();
  }));
});
