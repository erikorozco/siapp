import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormPsycometricManagementService } from 'src/app/shared/services/form-psycometric-management.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-psychometrics-managment',
  templateUrl: './list-psychometrics-managment.component.html',
  styleUrls: ['./list-psychometrics-managment.component.css']
})
export class ListPsychometricsManagmentComponent implements OnInit {

  psycometricConfigs: any;
  tableProperties: any;

  constructor(
    private formPsycometricManagementService: FormPsycometricManagementService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getAllPsycometrics();
  }

  getAllPsycometrics() {
    this.formPsycometricManagementService.getAll().subscribe(data => {
      this.psycometricConfigs = data;
      this.tableProperties = [{
          headElements: ['Nombre', 'Usuario autor', 'Fecha de creación', 'Estado', 'Acciones'],
          datasource: data,
          maxVisibleItems: 10,
          filterFunction : this.filterUsers,
          tableActions: {
            view: true,
            //edit: true,
            //delete: true,
            updateStatus: true,
            add: {
              route: ['/home', 'add-psycometric-config'],
              text: 'Agregar'
            }
          }
      }];
    }, error => {
      console.log(error);
    });

  }

  view(psycometricConfig: any) {
    this.router.navigate(['home/view-psycometric-config', psycometricConfig.id]);
  }

  edit(psycometricConfig: any) {
    this.router.navigate(['home/edit-psycometric-config', psycometricConfig.id]);
  }

  updateStatus(psycometricConfig) {
    this.formPsycometricManagementService.updateStatus(psycometricConfig.id).subscribe(response => {
      this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
      this.router.navigate(['home', 'psycometrics-managment']));
      this.toastr.success('El estado ls prueba ha sido actualizado exitosamente', 'Operacion exitosa');
    });
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.view(value);
        break;
      case 'edit':
        this.edit(value);
        break;
      case 'updateStatus':
        this.updateStatus(value);
        break; 
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }


  filterUsers(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.name.toLowerCase().includes(searchText.toLowerCase())) {
          const datePipe: DatePipe = new DatePipe('es-MX');
          var date = new Date(element.createdAt);
          let a = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
          const formatter = new Intl.DateTimeFormat("es-MX", {
            month: "long",
            day: "numeric",
            year: "numeric"
          });
          const formatedDate = formatter.format(date);
              element.tableFields = [
                                    element.name,
                                    `${element.therapist.name} ${element.therapist.last_name} ${element.therapist.second_last_name}`,
                                    formatedDate,
                                    element.active ? 'Acitvo' : 'Inactivo'
                                  ];
              return element;
            }
      }
    );
  }

}
