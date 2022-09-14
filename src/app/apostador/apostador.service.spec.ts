/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApostadorService } from './apostador.service';

describe('Service: Apostador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApostadorService]
    });
  });

  it('should ...', inject([ApostadorService], (service: ApostadorService) => {
    expect(service).toBeTruthy();
  }));
});
