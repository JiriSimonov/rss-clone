import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard',
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(module => module.DashboardModule)
    }
    ])
  ]
})
export class UserModule { }
