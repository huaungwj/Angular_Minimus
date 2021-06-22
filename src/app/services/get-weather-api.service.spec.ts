import { TestBed } from '@angular/core/testing';

import { GetWeatherApiService } from './get-weather-api.service';

describe('GetWeatherApiService', () => {
  let service: GetWeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
