import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {RouterModule} from "@angular/router";
import { AuthFormComponentUi } from './components/auth-form-ui/auth-form.component-ui';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthFormComponent} from "./components/auth-form/auth-form.component";


@NgModule({
  declarations: [
    UserAuthPageComponent,
    AuthFormComponentUi,
    AuthFormComponent
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
    ]),
    ReactiveFormsModule
  ]
})
export class UserAuthModule {

}
