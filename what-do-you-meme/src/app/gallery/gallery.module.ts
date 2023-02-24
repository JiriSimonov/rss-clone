import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material/material.module";
import {SharedModule} from "../shared/shared.module";
import { GalleryControlsComponent } from './components/gallery-controls/gallery-controls.component';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [
    GalleryPageComponent,
    GalleryControlsComponent,
    GalleryListComponent,
    GalleryItemComponent
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
        InfiniteScrollModule,
        SharedModule,
        MatGridListModule
    ]
})
export class GalleryModule { }
