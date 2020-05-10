import { Component, OnInit, Input } from '@angular/core';
import { NutritionSessionService } from 'src/app/shared/services/nutrition-session.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-nutrition-session',
  templateUrl: './list-nutrition-session.component.html',
  styleUrls: ['./list-nutrition-session.component.css']
})
export class ListNutritionSessionComponent implements OnInit {

  @Input() personId;
  @Input() recordId;
  nutritionSessions: any;
  tableProperties: any;

  constructor(
    private nutritionSessionService: NutritionSessionService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getNutritionSessions()
  }

  getNutritionSessions() {
    this.nutritionSessionService.getByRecordId(this.recordId).subscribe((res) => {
      this.nutritionSessions = res;
      this.tableProperties = [{
        headElements: ['# de sesión', 'Fecha', 'Profesionista', 'Acciones'],
        datasource: res,
        maxVisibleItems: 10,
        filterFunction : this.filterSessions,
        tableActions: {
          view: true,
          edit: true,
          add: {
            route: ['/home', 'add-nutrition-session', this.recordId, 'person', this.personId],
            text: 'Agregar sesión'
          }
        }
      }];
    }, error => {
      console.log(error);
    });
  }

  viewNutritionSession(nutritionSession: any) {
    this.router.navigate(['home', 'view-nutrition-session', nutritionSession.id, 'person', this.personId]);
  }

  editNutritionSession(nutritionSession: any) {
    this.router.navigate(['home', 'edit-nutrition-session', nutritionSession.id, 'person', this.personId]);
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewNutritionSession(value);
        break;
      case 'edit':
        this.authService.appendSession('nutritionSession', value.id);
        this.editNutritionSession(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  filterSessions(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.sessionNumber.toString().toLowerCase().includes(searchText.toLowerCase())
            || (`${element.therapist.name.toLowerCase()} ${element.therapist.last_name.toLowerCase()} ${element.therapist.second_last_name.toLowerCase()}`)
            .includes(searchText.toLowerCase())
            ) {
               const datePipe: DatePipe = new DatePipe('es-MX');
               var date = new Date(element.createdAt);
               let a = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
              element.tableFields = [
                                    element.sessionNumber,
                                    a,
                                    `${element.therapist.name} ${element.therapist.last_name} ${element.therapist.second_last_name}`
                                  ];
              return element;
            }
      }
    );
  }

}
