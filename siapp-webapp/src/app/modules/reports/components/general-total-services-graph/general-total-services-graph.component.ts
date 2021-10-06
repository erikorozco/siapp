import { Component, OnInit } from '@angular/core';
import { ServiceTypeDataService } from 'src/app/shared/services/data/report-data.service';

@Component({
  selector: 'app-general-total-services-graph',
  templateUrl: './general-total-services-graph.component.html',
  styleUrls: ['./general-total-services-graph.component.css']
})
export class GeneralTotalServicesGraphComponent implements OnInit {

  single: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  showDataLabel: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    public serviceTypeDataService:  ServiceTypeDataService
  ) {
    this.single = [
      {
        "name": "Germany",
        "value": 20
      },
      {
        "name": "USA",
        "value": 20
      },
      {
        "name": "France",
        "value": 20
      },
        {
        "name": "UK",
        "value": 40
      }
    ];
    this.serviceTypeDataService.reportData.subscribe((data) => {
      console.log(data)
    });
   }

  ngOnInit() {
  }

}
