import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    UserAuthPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
    },
    {
      path: 'login',
      component: UserAuthPageComponent,
    },
    ])
  ]
})
export class UserAuthModule {
}
