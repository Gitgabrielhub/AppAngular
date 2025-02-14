import { TestBed } from '@angular/core/testing';

import { LogoCryptoService } from './logo-crypto.service';

describe('LogoCryptoService', () => {
  let service: LogoCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
