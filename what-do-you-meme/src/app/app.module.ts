import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LobbiesComponent } from './lobbies/lobbies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LobbyComponent } from './lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserProfileComponent,
    LobbiesComponent,
    NotFoundComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
