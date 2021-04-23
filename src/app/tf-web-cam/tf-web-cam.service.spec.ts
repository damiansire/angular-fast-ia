import { TestBed } from '@angular/core/testing';

import { TfWebCamService } from './tf-web-cam.service';

describe('TfWebCamService', () => {
  let service: TfWebCamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfWebCamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
