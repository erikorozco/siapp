import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!;
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// COMPONENTS
import { AppComponent } from './app.component';
import { SidebarComponent } from './modules/dashboard/components/sidebar/sidebar.component';
import { TopbarComponent } from './modules/dashboard/components/topbar/topbar.component';
import { LoginComponent } from './modules/users/components/login/login.component';
import { ListUserComponent } from './modules/users/components/list-user/list-user.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { FormUserComponent } from './modules/users/components/form-user/form-user.component';
// SERVICES
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { RecordService } from './shared/services/record-service';
// CORE
import { Interceptor } from './shared/core/interceptor';
import { NavigationTreeComponent } from './shared/components/navigation-tree/navigation-tree.component';
import { TablePaginationComponent } from './shared/components/table-pagination/table-pagination.component';
import { UserRecordsComponent } from './modules/users/components/user-records/user-records.component';
import { ListRecordsDialogComponent } from './modules/records/components/list-records-dialog/list-records-dialog.component';
import { ListPersonComponent } from './modules/records/components/list-person/list-person.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { FormPersonComponent } from './modules/records/components/form-person/form-person.component';
import { RecordSummaryComponent } from './modules/records/components/record-summary/record-summary.component';
import { PrivacyAgreementComponent } from './modules/records/components/privacy-agreement/privacy-agreement.component';
import { SignComponent } from './shared/components/sign/sign.component';
import { RecordInformationComponent } from './modules/records/components/record-summary/components/record-information/record-information.component';
import { FormRecordComponent } from './modules/records/components/form-record/form-record.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { GenogramComponent } from './modules/records/components/record-summary/components/genogram/genogram.component';
import { AttachmentsComponent } from './modules/records/components/record-summary/components/attachments/attachments.component';
import { ImageViewComponent } from './shared/components/image-view/image-view.component';
import { ProfilePhotoComponent } from './modules/records/components/record-summary/components/profile-photo/profile-photo.component';
import { ListSessionComponent } from './modules/records/components/list-session/list-session.component';
import { FormSessionComponent } from './modules/records/components/form-session/form-session.component';
import localeEsMX from '@angular/common/locales/es-MX';
import { DatePipe, registerLocaleData } from '@angular/common';
import { TherapistRecordsComponent } from './modules/records/components/therapist-records/therapist-records.component';
import { DerivationsComponent } from './modules/records/components/record-summary/components/derivations/derivations.component';
import { FormMedicalReleaseComponent } from './modules/records/components/form-medical-release/form-medical-release.component';
import { ReleaseTypesDialogComponent } from './modules/records/components/record-summary/components/derivations/components/release-types-dialog/release-types-dialog.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FormDerivationComponent } from './modules/records/components/form-derivation/form-derivation.component';
import { ListUserDialogComponent } from './modules/users/components/list-user-dialog/list-user-dialog.component';
import { FormDropComponent } from './modules/records/components/form-drop/form-drop.component';
import { FormSurveyComponent } from './modules/records/components/form-survey/form-survey.component';
import { FormNutritionSessionComponent } from './modules/records/components/form-nutrition-session/form-nutrition-session.component';
import { ListNutritionSessionComponent } from './modules/records/components/list-nutrition-session/list-nutrition-session.component';
import { SessionsSummaryComponent } from './modules/records/components/record-summary/components/sessions-summary/sessions-summary.component';
import { ListCrisisInterventionComponent } from './modules/records/components/crisis-interventions/components/list-crisis-intervention/list-crisis-intervention.component';
import { FormCrisisInterventionComponent } from './modules/records/components/crisis-interventions/components/form-crisis-intervention/form-crisis-intervention.component';
import { ListPsychometricsManagmentComponent } from './modules/psychometrics/components/list-psychometrics-managment/list-psychometrics-managment.component';
import { FormPsycometricApplyComponent } from './modules/psychometrics/components/form-psycometric-apply/form-psycometric-apply.component';
import { FormQuestionComponent } from './modules/psychometrics/components/form-psycometric-apply/components/form-question/form-question.component';
import { FormPsycometricCreatorComponent } from './modules/psychometrics/components/form-psycometric-creator/form-psycometric-creator.component';
import { ListPsycometricApplicationComponent } from './modules/records/components/list-psycometric-application/list-psycometric-application.component';
import { ListPsycometricManagementDialogComponent } from './modules/psychometrics/components/list-psycometric-management-dialog/list-psycometric-management-dialog.component';
import { PrivacyPolicyComponent } from './modules/records/components/privacy-agreement/components/privacy-policy/privacy-policy.component';
import { CommitmetLetterComponent } from './modules/records/components/privacy-agreement/components/commitmet-letter/commitmet-letter.component';
import { FormSatisfactionSurveyComponent } from './modules/records/components/form-satisfaction-survey/form-satisfaction-survey.component';
import { PermissionService } from './shared/services/permission.service';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { AgendaComponent } from './modules/agenda/agenda.component';
import { InputTypeaheadComponent } from './shared/components/input-typeahead/input-typeahead.component';
import { InputSearchComponent } from './shared/components/input-serach/input-search.component';
import { InputSelectComponent } from './shared/components/input-select/input-select.component';
import { InputMultiSelectComponent } from './shared/components/input-multi-select/input-multi-select.component';
import { ListPersonsDialogComponent } from './modules/records/components/list-persons-dialog/list-persons-dialog.component';
import { FormAppointmentComponent } from './modules/agenda/form-appointment/form-appointment.component';
import { FormEventComponent } from './modules/agenda/form-event/form-event.component';
import { ModalCalendarEventComponent } from './modules/agenda/modal-calendar-event/modal-calendar-event.component';
import { UserDataService } from './shared/services/data/user-data.service';
import { UserSummaryComponent } from './modules/users/components/user-summary/user-summary.component';
import { ListTicketComponent } from './modules/tickets/components/list-ticket/list-ticket.component';
import { FormTicketComponent } from './modules/tickets/components/form-ticket/form-ticket.component';
import { ReportListComponent } from './modules/reports/report-list.component';
import { PrintTicketComponent } from './modules/tickets/components/print-ticket/print-ticket.component';
import { ServicesSummaryComponent } from './modules/reports/components/services-summary/services-summary.component';
// import { ListPsychometricsManagmentComponent } from './modules/psychometrics/components/list-psychometrics-managment/list-psychometrics-managment.component';
registerLocaleData(localeEsMX , 'es-MX');


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    LoginComponent,
    ListUserComponent,
    DashboardComponent,
    FormUserComponent,
    NavigationTreeComponent,
    TablePaginationComponent,
    UserRecordsComponent,
    ListRecordsDialogComponent,
    ListPersonComponent,
    LoadingSpinnerComponent,
    FormPersonComponent,
    RecordSummaryComponent,
    PrivacyAgreementComponent,
    SignComponent,
    RecordInformationComponent,
    FormRecordComponent,
    GenogramComponent,
    AttachmentsComponent,
    ImageViewComponent,
    ProfilePhotoComponent,
    ListSessionComponent,
    FormSessionComponent,
    TherapistRecordsComponent,
    DerivationsComponent,
    FormMedicalReleaseComponent,
    ReleaseTypesDialogComponent,
    NotFoundComponent,
    FormDerivationComponent,
    ListUserDialogComponent,
    FormDropComponent,
    FormSurveyComponent,
    FormNutritionSessionComponent,
    ListNutritionSessionComponent,
    SessionsSummaryComponent,
    ListCrisisInterventionComponent,
    FormCrisisInterventionComponent,
    ListPsychometricsManagmentComponent,
    FormPsycometricApplyComponent,
    FormQuestionComponent,
    FormPsycometricCreatorComponent,
    ListPsycometricApplicationComponent,
    ListPsycometricManagementDialogComponent,
    PrivacyPolicyComponent,
    CommitmetLetterComponent,
    FormSatisfactionSurveyComponent,
    ConfirmModalComponent,
    AgendaComponent,
    InputTypeaheadComponent,
    InputSearchComponent,
    InputSelectComponent,
    InputMultiSelectComponent,
    ListPersonsDialogComponent,
    FormAppointmentComponent,
    FormEventComponent,
    ModalCalendarEventComponent,
    UserSummaryComponent,
    ListTicketComponent,
    FormTicketComponent,
    ReportListComponent,
    PrintTicketComponent,
    ServicesSummaryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    OverlayModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SignaturePadModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatStepperModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    NgxChartsModule
  ],
  providers: [
    UserService,
    RecordService,
    PermissionService,
    UserDataService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    MatDialog,
    { provide: LOCALE_ID, useValue: 'es-MX' },
    DatePipe
  ],
  entryComponents: [
    ImageViewComponent,
    ReleaseTypesDialogComponent,
    ListUserDialogComponent,
    ListPsycometricManagementDialogComponent,
    AgendaComponent,
    ConfirmModalComponent,
    ListPersonsDialogComponent,
    ModalCalendarEventComponent
 ],
  bootstrap: [AppComponent],
})
export class AppModule { }
