import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthFormComponent} from "./components/auth-form/auth-form.component";
import {UserAuthRoutingModule} from "./user-auth-routing.module";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';


@NgModule({
  declarations: [
    UserAuthPageComponent,
    AuthFormComponent,
    SignUpComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAuthModule {

}
