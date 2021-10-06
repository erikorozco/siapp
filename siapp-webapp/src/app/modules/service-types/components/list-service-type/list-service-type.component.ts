import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceTypesService } from 'src/app/shared/services/service-types.service';

@Component({
  selector: 'app-list-service-type',
  templateUrl: './list-service-type.component.html',
  styleUrls: ['./list-service-type.component.css']
})
export class ListServiceTypeComponent implements OnInit {

  serviceTypes: any;
  tableProperties: any;

  constructor(
    private serviceTypesService: ServiceTypesService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.serviceTypesService.getAll().subscribe(data => {
      this.serviceTypes = data;
      this.tableProperties = [{
          headElements: ['Texto', 'Valor Excel', 'Fecha de creación', 'Estado', 'Acciones'],
          datasource: data,
          maxVisibleItems: 15,
          filterFunction : this.filterFn,
          tableActions: {
            view: true,
            updateStatus: true,
            edit: true,
            add: {
              route: ['/home', 'add-service-type'],
              text: 'Agregar'
            }
          }
      }];
    }, error => {
      console.log(error);
    });

  }

  view(serviceType: any) {
    this.router.navigate(['home/view-service-type', serviceType.id]);
  }

  edit(serviceType: any) {
    this.router.navigate(['home/edit-service-type', serviceType.id]);
  }

  updateStatus(serviceType) {
    // Set the opposite active value
    serviceType.active = !serviceType.active;
    this.serviceTypesService.update(serviceType.id, serviceType).subscribe(response => {
      this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
      this.router.navigate(['home', 'service-types']));
      this.toastr.success('El estado del servicio ha sido actualizado exitosamente', 'Operacion exitosa');
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

  filterFn(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.label.toLowerCase().includes(searchText.toLowerCase())) {
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
                                    element.label,
                                    element.value,
                                    formatedDate,
                                    element.active ? 'Activo' : 'Inactivo'
                                  ];
              return element;
            }
      }
    );
  }


}
