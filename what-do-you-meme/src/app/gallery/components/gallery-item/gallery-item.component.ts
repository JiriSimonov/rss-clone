import {Component, Input} from '@angular/core';
import {GalleryService} from "../../services/gallery.service";
import {map} from "rxjs";

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent {
  @Input() item!: string;
  private isAdded!: boolean
  public isAdded$ = this.galleryService.downloadItems$.pipe(
    map((arr) => this.isAdded = arr.some((elem) => elem === this.item))
  );

  constructor(private galleryService: GalleryService) {
  }

  addToDownloadList() {
    this.isAdded
      ? this.galleryService.removeFromDownloadList(this.item)
      : this.galleryService.addToDownloadItems(this.item);
  }
}
