import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthPageComponent } from './pages/sign-in-page/user-auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/sign-in-form/auth-form.component';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { SignUpComponent } from './pages/sign-up-page/sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SetPictureComponent } from './components/set-picture/set-picture.component';

@NgModule({
  declarations: [
    UserAuthPageComponent,
    AuthFormComponent,
    SignUpComponent,
    SignUpFormComponent,
    SetPictureComponent,
  ],
  imports: [CommonModule, UserAuthRoutingModule, ReactiveFormsModule],
})
export class UserAuthModule {}
