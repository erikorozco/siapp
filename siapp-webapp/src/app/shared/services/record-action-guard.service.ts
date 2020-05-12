import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
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

  async canActivate(route: ActivatedRouteSnapshot): Promise<any> {
    const entity = route.data.entity;
    let session = this.authService.getSession();
    if (session === null) {
      this.toastr.warning('No has cargado un expediente', 'Acesso denegado');
      this.router.navigate(['home']);
      return false;
    }
    const id = session[entity];
    const isAllowed = await this.authService.isAllowedToPerformAction(entity, id)
    if (!isAllowed) {
      this.toastr.warning('No cuentas con los permisos necesarios para ejectuar esta accion', 'Acesso denegado');
      this.router.navigate([this.router.url]);
      return false;
    }
    return true;
  }

}
