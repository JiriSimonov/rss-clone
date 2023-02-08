import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/sign-in-form/auth-form.component';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { SignUpComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserAuthPageComponent,
    AuthFormComponent,
    SignUpComponent,
    SignUpFormComponent,
  ],
  imports: [CommonModule, UserAuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class UserAuthModule {}
