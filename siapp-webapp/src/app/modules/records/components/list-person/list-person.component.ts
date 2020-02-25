import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person.model';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllPersons();
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe(data => {
      this.persons = data;
      this.tableProperties = [{
          headElements: ['Nombre', 'Apellidos', 'Teléfono', 'Acciones'],
          datasource: data,
          maxVisibleItems: 10,
          filterFunction : this.filterUsers,
          tableActions: {
            view: true,
            edit: true,
            delete: false,
            print: false,
            updateStatus: false,
            viewRecords: {
              toolTip: 'Ver Expediente',
            },
            add: {
              route: ['/home', 'add-person'],
              text: 'Agregar Paciente'
            }
          }
      }];
    }, error => {
      console.log(error);
    });
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
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  filterUsers(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.name.toLowerCase().includes(searchText.toLowerCase())
            || element.lastName.toLowerCase().includes(searchText.toLowerCase())
            || element.secondLastName.toLowerCase().includes(searchText.toLowerCase())
            || element.phone.toLowerCase().includes(searchText.toLowerCase())
            || (`${element.name.toLowerCase()} ${element.lastName.toLowerCase()} ${element.secondLastName.toLowerCase()}`)
            .includes(searchText.toLowerCase())
            ) {
              element.tableFields = [
                                    element.name,
                                    element.lastName + ' ' + element.secondLastName,
                                    element.phone,
                                    //element.active ? 'Acitvo' : 'Inactivo'
                                  ];
              return element;
            }
      }
    );
  }

}
