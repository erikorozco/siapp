import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.css']
})
export class NavigationTreeComponent implements OnInit {

  @Input() entityAction: string;
  @Input() personId;
  personName;
  translatedAction: string;

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.getAction();
    this.getPersonInfo();
  }

  getPersonInfo() {
    this.personService.getPerson(this.personId).subscribe((person) => {
      this.personName = `${person.name} ${ person.lastName } ${ person.secondLastName}`;
    });
  }

  getAction() {
    const actionProperties = this.entityAction.split('-');
    const action = this.translateAction(actionProperties[0]);
    const entity = this.translateEntity(actionProperties[1])
    this.translatedAction =  `${action} ${entity}`;  
  }

  private translateAction(action: string) {
    switch(action) {
      case 'add':
        return 'Agregar'
      case 'edit':
        return 'Editar'
      case 'view':
        return 'Ver'
      default:
        return 'Acción'  
    }

  }

  private translateEntity(entity: string) {
    switch(entity) {
      case 'derivation':
        return 'derivación'
      case 'session':
        return 'reporte clínico';
      case 'medical':
        return 'alta médica';
      case 'drop':
        return 'baja médica';  
      case 'survey':
        return 'encuesta de satisfacción';
    }
  }

}
