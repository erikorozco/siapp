import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    }, error => {});
  }

  viewUser(user: User) {
    this.router.navigate(['home/view-user', user.id]);
  }

  editUser(user: User) {
    this.router.navigate(['home/edit-user', user.id]);
  }

  deleteUser() {

  }

  filterUsers() {

  }

}
