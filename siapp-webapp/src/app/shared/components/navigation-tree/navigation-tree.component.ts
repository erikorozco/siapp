import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.css']
})
export class NavigationTreeComponent implements OnInit {

  @Input() entityAction: string;
  @Input() personId?;
  @Input() root = false;

  module
  personName;
  translatedAction: string;

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
    if(this.personId) {
      this.getPersonInfo();
    }
    this.getAction();
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
      case 'satisfaction':  
      case 'survey':
        return 'encuesta de satisfacción';
      case 'nutrition':
        return 'reporte nutricional';
      case 'crisis':
        return 'intervención en crisis'; 
      case 'psycometric':
        this.module = 'Pruebas psicometricas'
        return 'prueba'  
      case 'service':
        this.module = 'Servicios'
        return 'servicio'  
    }
  }

}
