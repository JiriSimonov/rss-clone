import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {AuthReducer, USER_AUTH_FEATURENAME} from "./auth.reducer";
import {HttpClientModule} from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import {AdminAuthEffects} from "./auth.effects";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(USER_AUTH_FEATURENAME, AuthReducer),
    EffectsModule.forFeature([AdminAuthEffects])
  ],
})
export class AuthStoreModule { }
