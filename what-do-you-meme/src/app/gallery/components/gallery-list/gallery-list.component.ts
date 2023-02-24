import {Component, OnInit} from '@angular/core';
import {GalleryService} from "../../services/gallery.service";

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  public scrollUpDistance = 4;
  public scrollDistance = 4;
  public throttle = 0;
  galleryCards$ = this.galleryService.galleryCards$;
  constructor(private galleryService: GalleryService) {

  }

  ngOnInit(): void {
    this.galleryService.galleryItemsRequest;
  }


  onScrollDown() {
    this.galleryService.incrementPage();
    this.galleryService.updateGalleryList();
  }

  onScrollUp() {
    this.galleryService.decrementPage();
  }
}
