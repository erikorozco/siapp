import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: any;
  tableProperties: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.tableProperties = [{
          headElements: ['Nombre', 'Apellidos', 'Epecialidad', 'Estado', 'Acciones'],
          datasource: data,
          maxVisibleItems: 10,
          filterFunction : this.filterUsers,
          tableActions: {
            view: true,
            edit: true,
            delete: false,
            print: false,
            updateStatus: true,
            viewRecords: true,
            add: {
              route: ['/home', 'add-user'],
              text: 'Agregar Terapeuta'
            }
          }
      }];
    }, error => {});
  }

  viewUser(user: User) {
    this.router.navigate(['home/view-user', user.id]);
  }

  editUser(user: User) {
    this.router.navigate(['home/edit-user', user.id]);
  }

  updateUserStatus(user: User) {
    this.userService.updateUserStatus(user.id).subscribe(response => {
      this.router.navigate(['home/view-user', user.id]);
      this.toastr.success('El estado el usario ha sido actualizado exitosamente', 'Operacion exitosa');
    });
  }

  viewRecords(user: User) {
    this.router.navigate(['home/user-records', user.therapist.id, user.id]);
  }


  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewUser(value);
        break;
      case 'edit':
        this.editUser(value);
        break;
      case 'updateStatus':
        this.updateUserStatus(value);
        break;
      case 'viewRecords':
        this.viewRecords(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  filterUsers(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.therapist.speciality.toLowerCase().includes(searchText.toLowerCase())
            || element.therapist.name.toLowerCase().includes(searchText.toLowerCase())
            || element.therapist.last_name.toLowerCase().includes(searchText.toLowerCase())
            || element.therapist.second_last_name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              element.tableFields = [
                                    element.therapist.name,
                                    element.therapist.last_name + ' ' + element.therapist.second_last_name,
                                    element.therapist.speciality,
                                    element.active ? 'Acitvo' : 'Inactivo'
                                  ];
              return element;
            }
      }
    );
  }

}
