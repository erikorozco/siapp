import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  users = new BehaviorSubject<Array<Object>>([]);

  constructor(
    private httpUserService: UserService
  ) {
    this.initializeUsers();
   }

   // Load users If users have not been initialized
   // NOTE: This is used for reload page commonly
  initializeUsers() {
    this.users.subscribe((value) => {
      if(value.length === 0) {
        this.fetchTherapists();
      }
    });
  }

  fetchTherapists() {
    this.httpUserService.getAllUsers().toPromise().then((data) => {
      const parsedUsers = data.map((user) => this.parseUser(user));
      this.users.next(parsedUsers);
    }, (error) => {
      console.log(error);
    });
  }

  parseUser(user) {
    const { active, roles, therapist } = user;
    let name = `${therapist.name} ${therapist.last_name}`.trim();
    let speciality = therapist.speciality.trim();
    const result = {
      active,
      roles,
      therapist,
      label: `[${speciality}] - ${name}`,
      searchValue: `${speciality.toLowerCase()} ${name.toLowerCase()}`
    };
    return result;
  }

  /**
   * Parse therapist object to match typeahead component
   *
   * @param {*} therapist
   * @returns
   * @memberof UserDataService
   */
  parseTherapist(therapist): any {
    let name = `${therapist.name} ${therapist.last_name}`.trim();
    let speciality = therapist.speciality.trim();
    const result = {
      therapist,
      label: `[${speciality}] - ${name}`,
      searchValue: `${speciality.toLowerCase()} ${name.toLowerCase()}`
    };
    return result;
  }

}
