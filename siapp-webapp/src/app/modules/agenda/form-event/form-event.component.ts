import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/shared/services/event.service';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit {

  @Input() props: EventType;
  @Input() action = 'view-appointment';

  eventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private eventService: EventService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
  }

  // onSubmit() {}

  formValidatorBuilder(): void {
    this.eventForm = this.formBuilder.group({
      id: ['', ],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      isBackground: [false, ],
      notes: ['', ],
      duration: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ],
      therapist: this.formBuilder.group({
        id: ['', Validators.compose([Validators.required])],
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
    return this.eventForm.get(field).invalid && this.eventForm.get(field).touched;
  }

}

type EventType = {
  endDate?: string;
  startDate?: string;
  duration?: string;
  isBackground?: boolean;
  notes?: string;
  therapist?: string;
}
