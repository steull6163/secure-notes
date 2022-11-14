import { TestBed } from '@angular/core/testing';

import { SecureNotesService } from './securenotes.service';

describe('SecurenotesService', () => {
  let service: SecureNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
