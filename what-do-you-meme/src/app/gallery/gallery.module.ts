import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material/material.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    GalleryPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: GalleryPageComponent,
    }]),
    SharedModule
  ]
})
export class GalleryModule { }
