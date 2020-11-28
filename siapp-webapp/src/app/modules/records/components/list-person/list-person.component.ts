import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  persons: any;
  tableProperties: any;

  constructor(
    private personService: PersonService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.initTable();
  }

  initTable() {
    // this.personService.getAllPersons().subscribe(data => {
      // this.persons = data;
      this.persons = {};
      this.tableProperties = [{
          headElements: ['Nombre', 'Apellidos', 'Teléfono', '# Expediente', 'Acciones'],
          datasource: [],
          maxVisibleItems: 10,
          filterFunction : this.filterUsers,
          tableActions: {
            view: true,
            edit: true,
            delete: true,
            formSearch : true,
            viewRecords: {
              toolTip: 'Ver Expediente',
            },
            add: {
              route: ['/home', 'add-person'],
              text: 'Agregar Paciente'
            }
          }
      }];
    // }, error => {
    //   console.log(error);
    // });
  }

  viewPerson(person: Person) {
    this.router.navigate(['home/view-person', person.id]);
  }

  editPerson(person: Person) {
    this.router.navigate(['home/edit-person', person.id]);
  }

  viewRecordSummary(person: Person) {
    this.router.navigate(['home/record-summary', person.id]);
  }

  deletePerson(person: Person) {
      const dialogRef = this.dialog.open(
        ConfirmModalComponent, 
        { 
          width: '400px', 
          height: '350px',
          data: {
            title: "Confirmación",
            body: `¿Estás seguro de borrar al paciente? [${person.name} ${person.lastName}]`,
            note: 'Se borrarán todas las citas. Y esta acción no podrá ser revertida'
          }
        }
      );

      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.personService.deletePerson(person.id).toPromise().then((res) => {
            this.toastr.success('El paciente ha isdo eliminado exitosamente', 'Operacion exitosa');
            this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
              this.router.navigate(['home', 'records'])
            );
          }, error => {
            this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
          });
        }
      });
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewPerson(value);
        break;
      case 'edit':
        this.editPerson(value);
        break;
      case 'viewRecords':
        this.viewRecordSummary(value);
        break;
      case 'search':
        this.filterPersons(value);
        break;
      case 'delete':
        this.deletePerson(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  filterPersons(searchText) {
    this.personService.filterPersons(searchText).subscribe((data) => {

      this.persons = data;
      this.tableProperties = [{
          headElements: ['Nombre', 'Apellidos', 'Teléfono', '# Expediente', 'Acciones'],
          datasource: this.persons,
          maxVisibleItems: 10,
          filterFunction : this.filterUsers,
          tableActions: {
            view: true,
            edit: true,
            formSearch : true,
            viewRecords: {
              toolTip: 'Ver Expediente',
            },
            add: {
              route: ['/home', 'add-person'],
              text: 'Agregar Paciente'
            },
            customActions: this.permissionService.permissions.value.canDeletePerson ?
            [
              {
                display: (person) => {return  !person.recordId },  
                text: 'Eliminar',
                action: 'delete',
                iconClass: {
                  'fa-trash': true
                },
                buttonClass: {
                  'btn-danger': true
                }
              }
            ] : null
          }
      }];

    }, (error) => {
      console.log(error);
    });
  }

  // Deprecated. Persons search is directly through the API
  filterUsers(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.name.toLowerCase().includes(searchText.toLowerCase())
            || element.lastName.toLowerCase().includes(searchText.toLowerCase())
            || element.secondLastName.toLowerCase().includes(searchText.toLowerCase())
            || element.phone.toLowerCase().includes(searchText.toLowerCase())
            || (`${element.name.toLowerCase()} ${element.lastName.toLowerCase()} ${element.secondLastName.toLowerCase()}`)
            .includes(searchText.toLowerCase())
            || element.recordId == searchText
            ) {
              element.tableFields = [
                                    element.name,
                                    element.lastName + ' ' + element.secondLastName,
                                    element.phone,
                                    element.recordId,
                                    //element.active ? 'Acitvo' : 'Inactivo'
                                  ];
              return element;
            }
      }
    );
  }

}
