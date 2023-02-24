import { Component } from '@angular/core';
import {GalleryService} from "../../services/gallery.service";
@Component({
  selector: 'app-gallery-controls',
  templateUrl: './gallery-controls.component.html',
  styleUrls: ['./gallery-controls.component.scss']
})
export class GalleryControlsComponent {
  downloadItems$ = this.galleryService.downloadItems$
  constructor(private galleryService: GalleryService) {
  }

  clearDownloadItems() {
    this.galleryService.clearDownloadItems();
  }

  downloadItems() {
    console.log('send')
    this.galleryService.downloadItemsArr()
  }
}
