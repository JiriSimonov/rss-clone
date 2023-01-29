import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {AuthFormComponentUi} from './components/auth-form-ui/auth-form.component-ui';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthFormComponent} from "./components/auth-form/auth-form.component";
import {UserAuthRoutingModule} from "./user-auth-routing.module";


@NgModule({
  declarations: [
    UserAuthPageComponent,
    AuthFormComponentUi,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAuthModule {

}
