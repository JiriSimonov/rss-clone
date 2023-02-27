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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketConfigService } from './shared/services/socket-config/socket-config.service';
import { WINDOW } from './shared/storage/tokens/window.token';
import { STORAGE_KEY_PREFIX } from './shared/storage/tokens/storage-key.token';
export const STORAGE_PREFIX = 'WDYM';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    SocketIoModule.forRoot(SocketConfigService.socketConfig),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    AuthStoreModule,
    SharedModule,
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: WINDOW,
      useFactory: () => window,
    },
    {
      provide: STORAGE_KEY_PREFIX,
      useValue: STORAGE_PREFIX,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
