import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
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
import { NavigationTreeComponent } from './modules/dashboard/components/navigation-tree/navigation-tree.component';
import { TablePaginationComponent } from './shared/components/table-pagination/table-pagination.component';
import { UserRecordsComponent } from './modules/users/components/user-records/user-records.component';
import { AssignRecordComponent } from './modules/records/components/list-records/list-records.component';


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
    AssignRecordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    OverlayModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    RecordService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    MatDialog
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
