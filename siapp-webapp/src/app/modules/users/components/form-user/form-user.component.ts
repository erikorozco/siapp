import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../../shared/services/role.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  rolesFormControl = new FormControl([], Validators.compose([Validators.required]));
  userRoles: any;

  formProperties: any = {
    action: '',
    params: {}
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.formValidatorBuilder();
    this.getRoles();

    this.routes.url.subscribe(url => {
      this.formProperties.action = url[0].path;
    });

    this.routes.params.subscribe(params => {
      this.formProperties.params = params;
    });

    if (this.formProperties.action === 'view-user') {
      this.userService.getUser(this.formProperties.params.id).subscribe(data => {
        this.user = data;
        this.userForm.setValue(data);
        this.rolesFormControl.setValue(data.roles);
      }, error => {console.log(error); });
      this.userForm.disable();
      this.rolesFormControl.disable();

    } else if (this.formProperties.action === 'edit-user') {
      this.userService.getUser(this.formProperties.params.id).subscribe(data => {
        this.user = data;
        this.userForm.setValue(data);
        this.rolesFormControl.setValue(data.roles);
      }, error => { console.log(error); });

    }

  }

  onSubmit() {
    this.userForm.get('roles').setValue(this.rolesFormControl.value);
    if (this.formProperties.action === 'add-user') {
      this.user = this.userForm.value;
      this.user.active = true;

      this.userService.createUser(this.userForm.value).subscribe(data => {
        this.toastr.success('El usuario ha isdo creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'users']);
      }, error => {
        this.toastr.error('Este usuario ya existe', 'Operacion invalida');
      });

    } else {
      this.userService.updateUser(this.formProperties.params.id, this.userForm.value).subscribe(data => {
        this.toastr.success('El usuario ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'users']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  requiredFieldValidation(field) {
    return this.userForm.get(field).invalid && this.userForm.get(field).touched;
  }

  changeDetection() {
     return false;
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe((res) => {
      this.userRoles = res;
    });
  }

  translateRolName(rolName) {
    let translatedName = '';
    switch (rolName) {
      case 'ADMIN':
        translatedName = 'ADMINISTRADOR';
        break;
      case 'SUPERADMIN':
        translatedName = 'SUPERADMINISTRADOR';
        break;
      case 'USER':
        translatedName = 'TERAPEUTA';
        break;
      default:
        translatedName = 'ROL NO REGISTRADO - NO USAR';
    }
    return translatedName;
  }

  formValidatorBuilder(): void {
    this.userForm = this.formBuilder.group({
      id: ['', ],
      password: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      roles: ['', ],
      active: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ],
      therapist: this.formBuilder.group({
        id: ['', ],
        name: ['', Validators.compose([Validators.required])],
        last_name: ['', Validators.compose([Validators.required])],
        second_last_name: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        speciality: ['', Validators.compose([Validators.required])],
        createdAt: ['', ],
        updatedAt: ['', ]
      })
    });
  }

}
