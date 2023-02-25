import {Component, OnInit} from '@angular/core';
import {GalleryService} from "../../services/gallery.service";

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  public scrollOptions = {
    scrollUpDistance: 16,
    scrollDistance: 16,
    throttle: 4
  };
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
