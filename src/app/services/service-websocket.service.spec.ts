import { TestBed } from '@angular/core/testing';

import { ServiceWebsocketService } from './service-websocket.service';

describe('ServiceWebsocketService', () => {
  let service: ServiceWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
