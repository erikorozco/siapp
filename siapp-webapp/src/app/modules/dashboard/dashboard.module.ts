import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
})
export class DashboardModule { }
