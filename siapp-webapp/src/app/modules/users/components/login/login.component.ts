import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { HttpParams } from '@angular/common/http';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;
  invalidLoginMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
    private userService: UserService,
  ) { }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }
    const loginPayload = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.authService.login(loginPayload.toString()).subscribe(data => {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        this.permissionService.initializeUIPermissions();
        this.userService.initializeUserInfo();
        this.router.navigate(['home']);
    }, error => {
      console.log(error);
      this.invalidLoginMessage = this.translateErrorMessage(error.error.error_description);
      this.invalidLogin = true;
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  translateErrorMessage(mesage: string): string {
    let result = 'Algo inesperado ocurrio, intente de nuevo o contacte al administrador'
    switch (mesage) {
      case 'User account is locked': 
        result = 'Esta cuenta ha sido deshabilitada por el administrador';
        break;
      case 'Bad credentials': 
        result = 'Credenciales invalidas. Intente de nuevo';
        break;
    }
    return result;
  }

}
