import { Component, OnInit, Input } from '@angular/core';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReleaseTypesDialogComponent } from './components/release-types-dialog/release-types-dialog.component';

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
    private derivationService: DerivationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRecordDerivations();
  }
  

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        break;
      case 'changeStatus':
        this.openReleaseOptionsModal(value);
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
              text: 'Dar de alta/baja',
              action: 'changeStatus',
              iconClass: {
                'fa-check': true
              },
              buttonClass: {
                'btn-primary': true
              }
            }
          ]
        }
      }];
    }, error => {
      console.log(error)
    });
  }

  openReleaseOptionsModal(value) {
    console.log(value);
    const dialogRef = this.dialog.open(ReleaseTypesDialogComponent, { width: '500px'/*, data: {name: this.name, animal: this.animal}*/ });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        // const payload = {
        //   recordId: record[0],
        //   therapistId: this.params.therapistId
        // };

        // this.recordService.assignRecord(payload).subscribe( data => {
        //   dialogRef.close();
        //   this.toastr.success('El paciente ha isdo asignado exitosamente', 'Operacion exitosa');
        //   this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
        //   this.router.navigate(['home', 'user-records', this.params.therapistId, this.params.userId]));
        // }, error => {
        //   console.log(error);
        // });
      }
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
