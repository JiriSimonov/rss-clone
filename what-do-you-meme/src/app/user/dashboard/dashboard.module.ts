import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import {RouterModule} from "@angular/router";
import { DashboardFormComponent } from './components/dashboard-form/dashboard-form.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardPageComponent,
    }])
  ]
})
export class DashboardModule { }
