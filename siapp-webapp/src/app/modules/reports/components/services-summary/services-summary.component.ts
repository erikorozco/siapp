import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';

@Component({
  selector: 'app-services-summary-report',
  templateUrl: './services-summary.component.html',
  styleUrls: ['./services-summary.component.css']
})
export class ServicesSummaryComponent {
  filters = {
    startDate: null,
    endDate: null
  };

  constructor(
    public dateTimeHelper: DateTimeHelper,
    public reportService: ReportService,
  ) {
    this.filters.startDate = this.dateTimeHelper.getTodayDateString();
    this.filters.endDate = this.dateTimeHelper.getTodayDateString();
  }

  updateFilters(value, key: string) {
    this.filters[key] = value;
  }

  generate() {
    const startDate = new Date(this.filters.startDate).toISOString();
    const endDate = new Date(this.filters.endDate).toISOString();
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    this.reportService.getAllTicketsReportXlsx(params);
  }

}
