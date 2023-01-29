import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAuthPageComponent} from "./pages/user-auth-page/user-auth-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: UserAuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserAuthRoutingModule {
}
