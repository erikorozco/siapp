import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonService } from '../person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  persons = new BehaviorSubject<Array<Object>>([]);

  constructor(
    private httpPersonService: PersonService
  ) {
    this.fetchPersons();
  }

  fetchPersons() {
    this.httpPersonService.filterPersons("").toPromise().then((data) => {
      const parsedPersons = data.map((user) => this.parsePersons(user));
      this.persons.next(parsedPersons);
    }, (error) => {
      console.log(error);
    });
  }

  parsePersons(user) {
    const { id, recordId, name, lastName, secondLastName, active, email, phone } = user;
    let personName = `${name} ${lastName} ${name} ${secondLastName}`.trim();
    const result = {
      active,
      id,
      recordId,
      email,
      phone,
      label: `${personName} - [${phone}]`,
      searchValue: `${phone} ${personName.toLowerCase()}`
    };
    return result;
  }
}
