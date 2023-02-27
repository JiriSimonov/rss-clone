import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {RouterModule} from '@angular/router';
import {DashboardFormComponent} from './components/dashboard-form/dashboard-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import {MaterialModule} from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [DashboardPageComponent, DashboardFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPageComponent,
      },
    ]),
  ],
})
export class DashboardModule {
}
