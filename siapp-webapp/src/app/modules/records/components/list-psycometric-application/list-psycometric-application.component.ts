import { Component, OnInit, Input } from '@angular/core';
import { PsycometricApplicationService } from 'src/app/shared/services/psycometric-application.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ListPsycometricManagementDialogComponent } from 'src/app/modules/psychometrics/components/list-psycometric-management-dialog/list-psycometric-management-dialog.component';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-list-psycometric-application',
  templateUrl: './list-psycometric-application.component.html',
  styleUrls: ['./list-psycometric-application.component.css']
})
export class ListPsycometricApplicationComponent implements OnInit {

  @Input() personId;

  psycometricApplications: any;
  tableProperties: any;

  constructor(
    private psycometricApplicationService: PsycometricApplicationService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private permissionService: PermissionService,
  ) { }


  ngOnInit() {
    this.getPsycometricApplications()
  }

  getPsycometricApplications() {
    this.psycometricApplicationService.getByPersonId(this.personId).subscribe(data => {
      this.psycometricApplications = data;
      this.tableProperties = [{
          headElements: ['Prueba', 'Profesional que aplicó', 'Fecha', 'Acciones'],
          datasource: data,
          maxVisibleItems: 10,
          filterFunction : this.filter,
          tableActions: {
            view: true,
            addEnabled: this.permissionService.permissions.value.canAddTest,
            addModal: this.permissionService.permissions.value.canAddTest ? 
            {
              text: 'Aplicar prueba',
              value: this.personId,
            } : null
          }
      }];
    }, error => {
      console.log(error);
    });
  }

  selectPsycometric() {
    const dialogRef = this.dialog.open(ListPsycometricManagementDialogComponent, { width: '800px'/*, data: {name: this.name, animal: this.animal}*/ });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (res) {
          this.router.navigate(['home', 'add-psycometric-application', res.id, 'person', this.personId]);
        }
      }
    });
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewPsycometricApplication(value);
        break;
      case 'openAddModal':
        this.selectPsycometric();
        break;  
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  viewPsycometricApplication(psycometricApplication: any) {
    this.router.navigate(['home', 'view-psycometric-application', psycometricApplication.id, 'person', this.personId]);
  }

  filter(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if ((`${element.therapist.name.toLowerCase()} ${element.therapist.last_name.toLowerCase()} ${element.therapist.second_last_name.toLowerCase()}`)
        .includes(searchText.toLowerCase())
            ) {
              const datePipe: DatePipe = new DatePipe('es-MX');
              var date = new Date(element.createdAt);
              let a = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX', );
              const formatter = new Intl.DateTimeFormat("es-MX", {
                month: "long",
                day: "numeric",
                year: "numeric"
              });
              const formatedDate = formatter.format(date);
              element.tableFields = [
                                    element.psycometric.name,
                                    `${element.therapist.name} ${element.therapist.last_name} ${element.therapist.second_last_name}`,
                                    formatedDate
                                  ];
              return element;
            }
      }
    );
  }

}
