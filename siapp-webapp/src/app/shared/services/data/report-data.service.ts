import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ReportService } from '../report.service';
import { HttpParams } from '@angular/common/http';
import { DateTimeHelper } from '../../utils/DateTimeHelper';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeDataService {
  reportData = new BehaviorSubject<any>(null);

  constructor(
    private httpReportService: ReportService,
    private dateTimeHelper: DateTimeHelper
  ) {
    
    const startDate = this.dateTimeHelper.getTodayDateString();
    const endDate = this.dateTimeHelper.getTodayDateString();
    this.fetchReportData(startDate, endDate);
  }

  fetchReportData(startDate, endDate) {
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    this.httpReportService.getAllStatisticsTicketsReport(params).toPromise().then((data) => {
      this.reportData.next(data);
    }, (error) => {
      console.log(error);
    });
  }
}
