/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserPaymentMethodService } from './UserPaymentMethod.service';

describe('Service: UserPaymentMethod', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPaymentMethodService]
    });
  });

  it('should ...', inject([UserPaymentMethodService], (service: UserPaymentMethodService) => {
    expect(service).toBeTruthy();
  }));
});
