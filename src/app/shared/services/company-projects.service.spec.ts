import { TestBed } from '@angular/core/testing';

import { CompanyProjectsService } from './company-projects.service';

describe('CompanyProjectsService', () => {
  let service: CompanyProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
