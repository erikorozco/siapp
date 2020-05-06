import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RecordActionGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async canActivate(): Promise<any> {
    let session = this.authService.getSession();
    if (session === null) {
      this.toastr.warning('No has cargado un expediente', 'Acesso denegado');
      this.router.navigate(['home']);
      return false;
    }
    const {record} = session;
    const isAllowed = await this.authService.isAllowedToPerformAction('record', record)
    if (!isAllowed) {
      this.toastr.warning('No cuentas con los permisos necesarios para ejectuar esta accion', 'Acesso denegado');
      this.router.navigate([this.router.url]);
      return false;
    }
    return true;
  }

}
