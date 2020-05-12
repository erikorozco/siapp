import { Component, OnInit, Input } from '@angular/core';
import { CrisisInterventionService } from 'src/app/shared/services/crisis-intervention.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list-crisis-intervention',
  templateUrl: './list-crisis-intervention.component.html',
  styleUrls: ['./list-crisis-intervention.component.css']
})
export class ListCrisisInterventionComponent implements OnInit {

  @Input() personId;

  crisisInterventions: any;
  tableProperties: any;

  constructor(
    private crisisInterventionService: CrisisInterventionService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getAllCrisisInterventions()
  }

  getAllCrisisInterventions() {
    this.crisisInterventionService.getByPersonId(this.personId).subscribe(data => {
      console.log(data)
      this.crisisInterventions = data;
      this.tableProperties = [{
          headElements: ['Profesional', 'Fecha', 'Acciones'],
          datasource: data,
          maxVisibleItems: 10,
          filterFunction : this.filter,
          tableActions: {
            view: true,
            edit: true,
            add: {
              route: ['/home', 'add-crisis-intervention', this.personId],
              text: 'Agregar intervención'
            }
          }
      }];
    }, error => {
      console.log(error);
    });
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewCrisisIntervention(value);
        break;
      case 'edit':
        this.authService.appendSession('crisisIntervention', value.id);
        this.editCrisisIntervention(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  viewCrisisIntervention(crisisIntervention: any) {
    this.router.navigate(['home', 'view-crisis-intervention', crisisIntervention.id, 'person', this.personId]);
  }

  editCrisisIntervention(crisisIntervention: any) {
    this.router.navigate(['home', 'edit-crisis-intervention', crisisIntervention.id, 'person', this.personId]);
  }

  filter(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if ((`${element.therapist.name.toLowerCase()} ${element.therapist.last_name.toLowerCase()} ${element.therapist.second_last_name.toLowerCase()}`)
        .includes(searchText.toLowerCase())
            ) {
              const datePipe: DatePipe = new DatePipe('es-MX');
              var date = new Date(element.createdAt);
              let a = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX', );
              const formatter = new Intl.DateTimeFormat("es-MX", {
                month: "long",
                day: "numeric",
                year: "numeric"
              });
              const formatedDate = formatter.format(date);
              // console.log(formatedDate)
              element.tableFields = [
                                    `${element.therapist.name} ${element.therapist.last_name} ${element.therapist.second_last_name}`,
                                    formatedDate
                                  ];
              return element;
            }
      }
    );
  }

}
