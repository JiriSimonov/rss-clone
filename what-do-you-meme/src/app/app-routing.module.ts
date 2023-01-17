import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AuthComponent} from "./auth/auth.component";
import {LobbiesComponent} from "./lobbies/lobbies.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'lobbies', component: LobbiesComponent },
  { path: 'lobby', component: LobbiesComponent },
  { path: 'profile',  component: UserProfileComponent},
  { path: '', component: AppComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
