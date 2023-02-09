import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthStoreModule } from './auth/store/auth-store.module';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketIoConfig } from 'ngx-socket-io/src/config/socket-io.config';

const config: SocketIoConfig = { url: 'https://wdym-js-er-sd.onrender.com', options: {auth: {token: localStorage.getItem('authData')}}}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    SocketIoModule.forRoot(config),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    AuthStoreModule,
    SharedModule,
    EffectsModule.forRoot([]),
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
