import { Component, OnInit, Input } from '@angular/core';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-derivations',
  templateUrl: './derivations.component.html',
  styleUrls: ['./derivations.component.css']
})
export class DerivationsComponent implements OnInit {

  @Input() recordId;  
  derivations: any;
  tableProperties: any;

  constructor(
    private derivationService: DerivationService
  ) { }

  ngOnInit() {
    this.getRecordDerivations();
  }


  executeAction({value, action}) {
    switch (action) {
      case 'view':
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  getRecordDerivations() {
    this.derivationService.getDerivationByRecordId(this.recordId).subscribe(data => {
      this.derivations = data;
      this.tableProperties = [{
        headElements: ['Tipo', 'Area', 'Estado', 'Fecha', 'Acciones'],
        datasource: data,
        maxVisibleItems: 10,
        filterFunction : this.filterDerivations,
        tableActions: {
          view: true,
          customActions: [
            {
              text: 'Dar de alta / baja',
              action: 'changeStatus',
              iconClass: {
                'fa-pencil-alt': true
              },
              buttonClass: {
                'btn-primary': true
              }
            }
          ]
        }
      }];
      console.log(data);
    }, error => {
      console.log(error)
    });
  }


  filterDerivations(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (
          element.derivedArea.toLowerCase().includes(searchText.toLowerCase())
          || element.status.toString().toLowerCase().includes(searchText.toLowerCase())
        ) {
            const datePipe: DatePipe = new DatePipe('es-MX');
            var date = new Date(element.createdAt);
            let customDate = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
            const derivationType = element.externalDerivation ? 'EXTERNA' : 'INTERNA';
            element.tableFields = [
                                    derivationType,
                                    element.derivedArea,
                                    element.status,
                                    customDate,
                                  ];
             return element;
          }
      }
    );
  }

}
