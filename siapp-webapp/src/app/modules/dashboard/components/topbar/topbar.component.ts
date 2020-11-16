import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { RecordService } from 'src/app/shared/services/record-service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  userDetails;
  isAdmin;
  isAdministrative;
  firstName: string;
  lastName: string;

  searchBox;

  constructor(
    private authService: AuthService,
    private recordService: RecordService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  search() {
    this.recordService.getRecordById(this.searchBox).subscribe((data) => {
      if (data) {
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
        this.router.navigate(['home', 'record-summary', data.person.id]));
        this.searchBox = '';
      }
    }, error => {
      this.toastr.info('No existe una expediente con ese número', 'Intenta nuevamente');
    });
  }

}
