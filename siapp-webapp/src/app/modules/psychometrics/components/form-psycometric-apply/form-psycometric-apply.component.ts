import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import {
  FormPsycometricManagementService
} from 'src/app/shared/services/form-psycometric-management.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  PsycometricApplicationService
} from 'src/app/shared/services/psycometric-application.service';

@Component({
  selector: 'app-form-psycometric-apply',
  templateUrl: './form-psycometric-apply.component.html',
  styleUrls: ['./form-psycometric-apply.component.css']
})
export class FormPsycometricApplyComponent implements OnInit, OnChanges {

  @Input() isPreview = false;
  @Input() isChild = false;
  @Input() iFormConfigString;
  @Input() iPersonId;
  @Input() iPsycometricId;
  @Input() iPsycometricApplicationId;
  @Input() iAction;

  personId;
  psycometricId;
  psycometricApplicationId
  action;

  formConfigJson: any;
  formPsycometric: FormGroup;

  constructor(
    private formPsycometricManagementService: FormPsycometricManagementService,
    private psycometricApplicationService: PsycometricApplicationService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private router: Router,
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (this.isPreview) {
      this.formPsycometric = null;
      this.formConfigJson = this.iFormConfigString;
      this.formPsycometric = this.formPsycometricManagementService.formConfigToFormGroup(this.iFormConfigString.payloadJson)
    }
  }


  ngOnInit() {
    if (!this.isPreview) {
      this.initFormProperties();

      if (this.action === 'add-psycometric-application') {
        this.getFormPsycometricFormConfig();
      } else if (this.action === 'view-psycometric-application') {
        this.view()
      }
    }
  }

  async view() {
    const psycometriApplication = await this.psycometricApplicationService.get(this.psycometricApplicationId).toPromise()
    let psycometricFormConfig = await this.formPsycometricManagementService.get(psycometriApplication.psycometric.id).toPromise()

    psycometricFormConfig['payloadJson'] = JSON.parse(psycometricFormConfig.payload);
    this.formConfigJson = psycometricFormConfig;
    this.formPsycometric = this.formPsycometricManagementService.formConfigToFormGroup(this.formConfigJson.payloadJson)

    const jsonValue = JSON.parse(psycometriApplication.payload);
    this.formPsycometric.setValue(jsonValue);
    this.formPsycometric.disable();

  }

  getFormPsycometricFormConfig() {
    this.formPsycometricManagementService.get(this.psycometricId).subscribe(data => {
      data['payloadJson'] = JSON.parse(data.payload);
      this.formConfigJson = data;
      this.formPsycometric = this.formPsycometricManagementService.formConfigToFormGroup(this.formConfigJson.payloadJson)
    }, error => {
      console.log(error);
    });
  }

  initFormProperties() {
    if (this.isChild) {
      this.action = this.iAction;
      this.psycometricId = this.iPsycometricId;
      this.personId = this.iPersonId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });

      this.routes.params.subscribe(params => {
        this.personId = params.personId;
        this.psycometricId = params.psycometricId;
        this.psycometricApplicationId = params.psycometricApplicationId;
      });
    }
  }

  onSubmit() {
    const payload = {
      payload: JSON.stringify(this.formPsycometric.value),
      psycometric: {
        id: this.psycometricId
      },
      person: {
        id: this.personId
      },
      therapist: {
        id: ''
      }
    }
    console.log(payload)
    this.psycometricApplicationService.create(payload).subscribe(data => {
      this.toastr.success('Los resultados ha sido guradados exitosamente', 'Operacion exitosa');
      this.router.navigate(['home', 'record-summary', this.personId]);
    }, error => {
      this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
    });
  }

}
