import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ListUserComponent } from '../list-user/list-user.component';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user-dialog',
  templateUrl: './list-user-dialog.component.html',
  styleUrls: ['./list-user-dialog.component.css']
})
export class ListUserDialogComponent  implements OnInit {

  users: any;
  tableProperties: any;

  constructor(
    private userService: UserService,
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
            assign: true
          }
      }];
    }, error => {});
  }



  executeAction({value, action}) {
    switch (action) {
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
            || (`${element.therapist.name.toLowerCase()} ${element.therapist.last_name.toLowerCase()} ${element.therapist.second_last_name.toLowerCase()}`)
                .includes(searchText.toLowerCase())
            ) {
              element.tableFields = [
                                    element.therapist.name,
                                    element.therapist.last_name + ' ' + element.therapist.second_last_name,
                                    element.therapist.speciality,
                                    element.active ? 'Activo' : 'Inactivo'
                                  ];
              return element;
            }
      }
    );
  }

}
