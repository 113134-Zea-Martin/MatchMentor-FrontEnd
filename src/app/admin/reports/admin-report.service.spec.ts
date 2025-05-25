import { TestBed } from '@angular/core/testing';

import { AdminReportService } from './admin-report.service';

describe('AdminReportService', () => {
  let service: AdminReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
