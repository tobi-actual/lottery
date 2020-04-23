/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BatchAssignerService } from './batch-assigner.service';

describe('Service: BatchAssigner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchAssignerService]
    });
  });

  it('should ...', inject([BatchAssignerService], (service: BatchAssignerService) => {
    expect(service).toBeTruthy();
  }));
});
