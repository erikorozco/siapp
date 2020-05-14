import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormPsycometricManagementService } from 'src/app/shared/services/form-psycometric-management.service';

@Component({
  selector: 'app-form-psycometric-apply',
  templateUrl: './form-psycometric-apply.component.html',
  styleUrls: ['./form-psycometric-apply.component.css']
})
export class FormPsycometricApplyComponent implements OnInit, OnChanges{

  @Input() isPreview = false;
  @Input() iFormConfigString;

  formConfigJson: any;
  formPsycometric: FormGroup;

  constructor(
    private formPsycometricManagementService: FormPsycometricManagementService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(this.isPreview) {
      console.log("changes")
      this.formPsycometric = null;
      this.formConfigJson = this.iFormConfigString;
      this.formPsycometric = this.formPsycometricManagementService.formConfigToFormGroup(this.iFormConfigString.payload)

    }

  }
    

  ngOnInit() {
    if (this.isPreview) {
      // console.log("init")
      // this.formConfigJson = this.iFormConfigString;
      // this.formPsycometric = this.formPsycometricManagementService.formConfigToFormGroup(this.iFormConfigString.payload)
    } else {
      this.formConfigJson = this.formPsycometricManagementService.getPsycometricFormConfig();
      console.log(JSON.stringify(this.formConfigJson.payload))
      this.formPsycometric = this.formPsycometricManagementService.formConfigToFormGroup(this.formConfigJson.payload)
    }
  }

  onSubmit() {
    console.log(JSON.stringify(this.formPsycometric.getRawValue()));
  }

}
