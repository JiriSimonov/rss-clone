import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthFormComponent} from "./components/auth-form/auth-form.component";
import {UserAuthRoutingModule} from "./user-auth-routing.module";


@NgModule({
  declarations: [
    UserAuthPageComponent,
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
