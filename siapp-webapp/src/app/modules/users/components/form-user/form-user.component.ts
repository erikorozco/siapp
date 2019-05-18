import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  successAlert = false;
  errorAlert = false;
  message = '';

  formProperties: any = {
    action: '',
    params: {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formVlidatorBuilder();

    this.routes.url.subscribe(url => {
      this.formProperties.action = url[0].path;
    });

    this.routes.params.subscribe(params => {
      this.formProperties.params = params;
    });

    if (this.formProperties.action === 'view-user') {
      this.userService.getUser(this.formProperties.params.id).subscribe(data => {
        this.userForm.setValue(data);
      }, error => {console.log(error); });
      this.userForm.disable();

    } else if (this.formProperties.action === 'edit-user') {
      this.userService.getUser(this.formProperties.params.id).subscribe(data => {
        this.userForm.setValue(data);
      }, error => { console.log(error); });

    }

  }

  onSubmit() {
    if (this.formProperties.action === 'add-user') {
      this.user = this.userForm.value;
      this.user.roles = [{id: 2}];//SET THE ADMIN ROL, THEN CHANGE THIS LOGIC
      this.user.active = true;
      this.userService.createUser(this.userForm.value).subscribe(data => {
        this.message = 'Usuario creado exitosamente';
        this.successAlert = true;
        this.router.navigate(['home', 'users']);
      }, error => {
        this.message = 'El usuario ya existe';
        this.errorAlert = true;
      });
    } else {
      console.log('edit');
    }
  }

  requiredFieldValidation(field) {
    return this.userForm.get(field).invalid && this.userForm.get(field).touched;
  }

  formVlidatorBuilder(): void {
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
