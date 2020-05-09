import { Component, OnInit, Input } from '@angular/core';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReleaseTypesDialogComponent } from './components/release-types-dialog/release-types-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-derivations',
  templateUrl: './derivations.component.html',
  styleUrls: ['./derivations.component.css']
})
export class DerivationsComponent implements OnInit {

  @Input() recordId;
  @Input() personId;
  derivations: any;
  tableProperties: any;

  constructor(
    private derivationService: DerivationService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getRecordDerivations();
  }
  

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.authService.appendSession('derivation', value.id);
        this.router.navigate(['home', 'view-derivation', value.id,'person', this.personId]);
        break;
      case 'edit':
        this.authService.appendSession('derivation', value.id);
        this.router.navigate(['home', 'edit-derivation', value.id,'person', this.personId]);
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
          add: {
            route: ['/home', 'add-derivation', this.recordId, 'person', this.personId],
            text: 'Agregar derivación'
          },
          edit: true,
          view: true,
          customActions: [
            {
              display: (derivation) => {return  derivation.status === 'EN CURSO'},  
              text: 'Dar de alta/baja',
              action: 'changeStatus',
              iconClass: {
                'fa-check': true
              },
              buttonClass: {
                'btn-success': true
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
    this.authService.appendSession('derivation', value.id);
    const dialogRef = this.dialog.open(ReleaseTypesDialogComponent, { width: '500px'});
    dialogRef.afterClosed().subscribe(option => {
      if (option) {
        switch(option) {
          case 'medicalRelease':
            this.router.navigate(['home', 'add-medical-release', value.id, 'person', this.personId]);
            break;
          case 'medicalDrop':
            this.router.navigate(['home', 'add-drop', value.id, 'person', this.personId]);
            break;
          default:
           console.log('Invalid option selected');
        }
      }
    });

  }

  filterDerivations(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (
          element.derivedArea.toLowerCase().includes(searchText.toLowerCase())
          || element.status.toString().toLowerCase().includes(searchText.toLowerCase())
          || element.derivationType.toLowerCase().includes(searchText.toLowerCase())
        ) {
            const datePipe: DatePipe = new DatePipe('es-MX');
            var date = new Date(element.createdAt);
            let customDate = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
            element.tableFields = [
                                    element.derivationType,
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
