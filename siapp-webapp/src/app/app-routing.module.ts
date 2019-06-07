import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/users/components/login/login.component';
import { ListUserComponent } from './modules/users/components/list-user/list-user.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { FormUserComponent } from './modules/users/components/form-user/form-user.component';
import { TablePaginationComponent } from './shared/components/table-pagination/table-pagination.component';
import { UserRecordsComponent } from './modules/users/components/user-records/user-records.component';
import { AssignRecordComponent } from './modules/records/components/list-records/list-records.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  // { path: '**', component: DashboardComponent },
   { path: 'test', component: TablePaginationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent,
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
      { path: 'assign-record/:therapistId', component: AssignRecordComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
