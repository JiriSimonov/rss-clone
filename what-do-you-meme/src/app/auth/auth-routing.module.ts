import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up-page/sign-up-page.component';
import { UserAuthPageComponent } from './pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserAuthPageComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
