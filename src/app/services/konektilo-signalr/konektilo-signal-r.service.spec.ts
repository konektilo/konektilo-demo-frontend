import { TestBed } from '@angular/core/testing';

import { KonektiloSignalRService } from './konektilo-signal-r.service';

describe('KonektiloSignalRService', () => {
  let service: KonektiloSignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonektiloSignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
