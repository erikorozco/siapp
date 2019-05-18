import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/users/components/login/login.component';
import { ListUserComponent } from './modules/users/components/list-user/list-user.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { FormUserComponent } from './modules/users/components/form-user/form-user.component';
import { TablePaginationComponent } from './modules/table-pagination/table-pagination.component';

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
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
