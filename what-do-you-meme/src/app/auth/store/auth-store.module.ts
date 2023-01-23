import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {AuthReducer, USER_AUTH_FEATURENAME} from "./auth.reducer";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(USER_AUTH_FEATURENAME, AuthReducer),
    EffectsModule.forFeature([AuthService])
  ],
})
export class AuthStoreModule { }
