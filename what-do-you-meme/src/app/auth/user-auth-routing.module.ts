import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {UserAuthPageComponent} from "./pages/user-auth-page/user-auth-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserAuthPageComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserAuthRoutingModule {
}
