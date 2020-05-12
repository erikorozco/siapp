import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.css']
})
export class ListSessionComponent implements OnInit {

  @Input() personId;
  @Input() recordId;
  sessions: any;
  tableProperties: any;


  constructor(
    private sessionService: SessionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getSessions();
  }

  getSessions() {
    this.sessionService.getSessionsByRecordId(this.recordId).subscribe((res) => {
      this.sessions = res;
      this.tableProperties = [{
        headElements: ['# de sesión', 'Fecha', 'Tipo de sesión', 'Profesionista', 'Acciones'],
        datasource: res,
        maxVisibleItems: 10,
        filterFunction : this.filterSessions,
        tableActions: {
          view: true,
          edit: true,
          delete: false,
          print: false,
          updateStatus: false,
          add: {
            route: ['/home', 'add-session', this.recordId, 'person', this.personId],
            text: 'Agregar sesión'
          }
        }
      }];
    }, error => {
      console.log(error);
    });
  }

  viewSession(session: any) {
    this.router.navigate(['home', 'view-session', session.id, 'person', this.personId]);
  }

  editSession(session: any) {
    this.router.navigate(['home', 'edit-session', session.id, 'person', this.personId]);
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewSession(value);
        break;
      case 'edit':
        this.authService.appendSession('session', value.id);
        this.editSession(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }


  filterSessions(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.sessionType.toLowerCase().includes(searchText.toLowerCase())
            || element.sessionNumber.toString().toLowerCase().includes(searchText.toLowerCase())
            || (`${element.therapist.name.toLowerCase()} ${element.therapist.last_name.toLowerCase()} ${element.therapist.second_last_name.toLowerCase()}`)
            .includes(searchText.toLowerCase())
            ) {
               const datePipe: DatePipe = new DatePipe('es-MX');
               var date = new Date(element.sessionDate);
               let a = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
              element.tableFields = [
                                    element.sessionNumber,
                                    a,
                                    element.sessionType,
                                    `${element.therapist.name} ${element.therapist.last_name} ${element.therapist.second_last_name}`
                                  ];
              return element;
            }
      }
    );
  }

}
