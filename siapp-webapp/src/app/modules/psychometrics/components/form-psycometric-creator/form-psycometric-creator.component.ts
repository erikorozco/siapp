import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormPsycometricManagementService } from 'src/app/shared/services/form-psycometric-management.service';
import { first } from 'rxjs/operators';
import {
  StringUtil
} from 'src/app/shared/utils/string-util';

@Component({
  selector: 'app-form-psycometric-creator',
  templateUrl: './form-psycometric-creator.component.html',
  styleUrls: ['./form-psycometric-creator.component.css']
})
export class FormPsycometricCreatorComponent implements OnInit {

  id;
  action;
  psycometricConfig: any;
  psycometricConfigForm: FormGroup;
  questions = [];
  options = [];
  previewRequest = false;
  isCodeGenerated = false;

  //Creator formControls
  questionsFormGroup = this.formBuilder.group({
    questionType: ['', Validators.compose([Validators.required])],
    questionName: ['', Validators.compose([Validators.required])],
    questionRequired: ['', Validators.compose([Validators.required])],
    questionOptionString: ['', ],
    questionNumber: ['', ],
    optionKey: ['', ],
    optionValue: ['', ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private formPsycometricManagementService: FormPsycometricManagementService
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();
    
    if (this.action === 'view-derivation') {
      this.formPsycometricManagementService.get(this.id).subscribe(data => {
        this.psycometricConfig = data;
        this.psycometricConfigForm.setValue(data);
      }, error => {console.log(error); });
      this.psycometricConfigForm.disable();

      //Get medicalRelease or drop and survey if exists on view mode

    } else if (this.action === 'edit-derivation') {
      this.formPsycometricManagementService.get(this.id).subscribe(data => {
        this.psycometricConfigForm.setValue(data);
      }, error => { console.log(error); });
    }
  }
  
  initFormProperties() {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });

      this.routes.params.subscribe(params => {
        this.id = params.id;
      });
  }

  onSubmit() {
    if (this.action === 'add-psycometric-config') {
      this.psycometricConfigForm.get(['payload']).setValue(JSON.stringify(this.psycometricConfigForm.get(['payloadJson']).value)); 
      this.formPsycometricManagementService.create(this.psycometricConfigForm.value).subscribe(data => {
        this.toastr.success('La prueba ha isdo creada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'psycometrics-managment']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.formPsycometricManagementService.update(this.id, this.psycometricConfigForm.value).subscribe(data => {
        this.toastr.success('La prueba ha isdo actualizada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'psycometrics-managment']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.psycometricConfigForm = this.formBuilder.group({
      id: ['', ],
      code: [{value: '', disabled: true}, Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      payload: [[], ],
      payloadJson: [[], ],
      active: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ],
      therapist: this.formBuilder.group({
        id: ['', ],
        name: ['', ],
        last_name: ['', ],
        second_last_name: ['', ],
        phone: ['', ],
        speciality: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ]
      })
    });
  }

  requiredFieldValidation(field) {
    return this.psycometricConfigForm.get(field).invalid && this.psycometricConfigForm.get(field).touched;
  }

  addQuestionForm(multipleOption = false) {
    const index = this.questions.length + 1;

    const question = {
      key: this.psycometricConfigForm.get(['code']).value+index,
      controlType: this.questionsFormGroup.get(['questionType']).value ,
      label: this.questionsFormGroup.get(['questionName']).value,
      required: this.questionsFormGroup.get(['questionRequired']).value,
      // options: multipleOption ? this.getOptions(this.questionsFormGroup.get(['questionOptionString']).value) : '',
      options: multipleOption ? this.options : '',
      order: index
    }

    this.questions.push(question)
    // console.log(this.questions);
    const emptyForm = {
      questionType: '',
      questionName: '',
      questionRequired: '',
      questionOptionString: '',
      questionNumber: '',
      optionValue: '',
      optionKey: ''
    }
    this.options = [];
    this.questionsFormGroup.setValue(emptyForm);
    this.psycometricConfigForm.get(['payload']).setValue(this.questions)
    this.previewRequest = true;
  }

  addOption() {
    let opt = {
      value: this.questionsFormGroup.get(['optionValue']).value,
      key: this.questionsFormGroup.get(['optionKey']).value
    }
    this.options.push(opt)
    this.questionsFormGroup.get(['optionKey']).setValue('');
    this.questionsFormGroup.get(['optionValue']).setValue('');
  }

  generateCode() {
    this.isCodeGenerated = true;
    const name = this.psycometricConfigForm.get(['name']).value;
    const code = `${name.charAt(0)}${name.charAt(1)}${name.charAt(name.length-2)}${name.charAt(name.length-1)}`;
    this.psycometricConfigForm.get(['code']).setValue(code.toLocaleLowerCase());
  }

  // private getOptions(optionsString) {
  //   let result = [];
  //   const options = optionsString.split(',');

  //   options.forEach(option => {
  //     const optionProperties = option.split(':');
  //     let opt = {
  //       value: optionProperties[0],
  //       key: optionProperties[1]
  //     }
  //     result.push(opt)
  //   });
  //   return result;
  // }

}
