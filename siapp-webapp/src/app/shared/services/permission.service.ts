import { Injectable } from '@angular/core';
import { host } from '../core/service.global.config';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  baseUrl: string = host();
  accessToken: string;
  permissions = new BehaviorSubject(undefined);

  readonly RECEPTION_MODULE = 'receptionModule';
  readonly ADMIN_MODULES = 'adminModule';

  constructor(
    private http: HttpClient
  ) {
    // Load permissions If permissions have not been initialized
    // NOTE: This is used for reload page commonly
    this.permissions.subscribe((value) => {
      if(!value) {
        this.initializeUIPermissions();
      }
    });
  }

  initializeUIPermissions() {
    this.getAllPermissions().then((res) => {
      if (res) {
        this.permissions.next(res);
      }
    });
  }
  
  getAllPermissions() {
    const url = `${this.baseUrl }${URL_CONF.permissionAPI.name}${URL_CONF.permissionAPI.endpoints.getAllPermissions}`;
    return this.http.get(url).toPromise();
  }

  /** USE THIS CODE ON THE APLICATION INSTEAD OF ATUH.SERVICE CODE. */
  
  /* TO-DO: set the roles to session instead of hitting the API. Change logic on the implementer components.
  * This method is used to grant modules permissions at component level
  * Use isAllowedToPerformAction instead isAllowed
  * @param roles [{name: 'rolNanme'}...]
  * @param module ADMIN, ADMINISTRATIVE, USER
  */
 isAllowed(roles: any[], module: string) {
   switch (module) {
     case this.RECEPTION_MODULE:
       return this.isAdministrative(roles);
     case this.ADMIN_MODULES:
         return this.isAdmin(roles);
   }
 }

 /**
  * Returns true if entity is assigned to user OR
  * return true if user is admin on some cases
  * 
  * 
  * Note: Whoever calls this function must to be ASYNC
  * 
  * @param entity record, session, derivation, admin, superadmin
  * @param entityId
  */
 async isAllowedToPerformAction(entity: string, entityId) {
   const permission = await this.getPermission(entity, entityId).toPromise().
     catch(error => {
       console.log(error);
     });
   return permission.isAllowed;
 }

 private getPermission(entity, entityId) {
   const payload = {
     entity : entity,
     entityId : entityId
   }
   const url = `${this.baseUrl }${URL_CONF.permissionAPI.name}${URL_CONF.permissionAPI.endpoints.isAllowedToRecord}`;
   return this.http.post<any>(url, payload );
 }

 private isAdministrative(roles: any[]) {
   const isAdminRoleFound = roles.find(role => role.name === 'ADMINISTRATIVE');
   return isAdminRoleFound ? true : false;
 }

 private isAdmin(roles: any[]) {
   const isAdminRoleFound = roles.find(role => role.name === 'ADMIN');
   return isAdminRoleFound ? true : false;
 }

}
