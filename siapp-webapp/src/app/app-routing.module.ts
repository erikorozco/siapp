import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/users/components/login/login.component';
import { ListUserComponent } from './modules/users/components/list-user/list-user.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { FormUserComponent } from './modules/users/components/form-user/form-user.component';
import { TablePaginationComponent } from './shared/components/table-pagination/table-pagination.component';
import { UserRecordsComponent } from './modules/users/components/user-records/user-records.component';
import { ListRecordsDialogComponent } from './modules/records/components/list-records-dialog/list-records-dialog.component';
import { ListPersonComponent } from './modules/records/components/list-person/list-person.component';
import { FormPersonComponent } from './modules/records/components/form-person/form-person.component';
import { RecordSummaryComponent } from './modules/records/components/record-summary/record-summary.component';
import { PrivacyAgreementComponent } from './modules/records/components/privacy-agreement/privacy-agreement.component';
import { FormRecordComponent } from './modules/records/components/form-record/form-record.component';
import { FormSessionComponent } from './modules/records/components/form-session/form-session.component';
import { TherapistRecordsComponent } from './modules/records/components/therapist-records/therapist-records.component';
import { RecordActionGuardService } from './shared/services/record-action-guard.service';
import { FormMedicalReleaseComponent } from './modules/records/components/form-medical-release/form-medical-release.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FormDerivationComponent } from './modules/records/components/form-derivation/form-derivation.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'test', component: TablePaginationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent,
  // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
    children: [
      { path: 'users', component: ListUserComponent },
      { path: 'add-user', component: FormUserComponent },
      { path: 'edit-user/:id', component: FormUserComponent },
      { path: 'edit-user', redirectTo: 'add-user' },
      { path: 'view-user/:id', component: FormUserComponent },
      { path: 'view-user', redirectTo: 'add-user' },
      { path: 'user-records/:therapistId/:userId', component: UserRecordsComponent },
      { path: 'user-records', component: ListUserComponent },
      { path: 'assign-record', redirectTo: 'users' },
      { path: 'assign-record/:therapistId', component: ListRecordsDialogComponent },
      { path: 'records', component: ListPersonComponent },
      { path: 'add-person', component: FormPersonComponent },
      { path: 'edit-person/:id', component: FormPersonComponent },
      { path: 'edit-person', redirectTo: 'add-person' },
      { path: 'view-person/:id', component: FormPersonComponent },
      { path: 'view-person', redirectTo: 'add-person' },
      { path: 'record-summary/:personId', component: RecordSummaryComponent },
      { path: 'record-summary', redirectTo: 'records' },
      { path: 'existing-person-opening-record/:personId', component: FormRecordComponent },
      { path: 'new-person-opening-record', component: FormRecordComponent },
      { path: 'privacy-agreement/:personId', component: PrivacyAgreementComponent },
      { path: 'add-session/:recordId/person/:personId', component: FormSessionComponent },
      { path: 'edit-session/:id/person/:personId', component: FormSessionComponent },
      { path: 'edit-session', redirectTo: 'add-session' },
      { path: 'view-session/:id/person/:personId', component: FormSessionComponent },
      { path: 'view-session', redirectTo: 'add-session' },
      { path: 'therapist-records/:therapistId/:userId', component: UserRecordsComponent },
      {
        path: 'add-derivation/:recordId/person/:personId', 
        component: FormDerivationComponent,
        canActivate:  [RecordActionGuardService],
        data : {
          entity: 'admin'
        }
      },
      {
        path: 'view-derivation/:derivationId/person/:personId',
        component: FormDerivationComponent
      },
      {
        path: 'edit-derivation/:derivationId/person/:personId',
        component: FormDerivationComponent,
        canActivate:  [RecordActionGuardService],
        data: {
          entity: 'derivation'
        }
      }
      // { path: '', component: NotFoundComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
