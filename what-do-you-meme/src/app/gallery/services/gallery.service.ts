import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../shared/services/config/config.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private SERVER_URL = ConfigService.SERVER_URL;
  private downloadItems$$ = new BehaviorSubject<string[]>([]);
  public downloadItems$ = this.downloadItems$$.asObservable();
  private galleryItems!: string[];
  private galleryCards$$ = new BehaviorSubject<string[]>([]);
  public galleryCards$ = this.galleryCards$$.asObservable();
  private chunkOptions = {
    page: 0,
    limit: 12,
  }

  constructor(private http: HttpClient) {
  }

  get galleryItemsRequest() {
    return this.http.get<string[]>(`${this.SERVER_URL}/file/images/meme`).subscribe(
      (items) => {
        this.galleryItems = items;
        this.updateGalleryList();
      },
    );
  }

  get page() {
    return this.chunkOptions.page;
  }

  get limit() {
    return this.chunkOptions.limit;
  }

  getChunk(arr: string[]) {
    return arr.slice(this.page * this.limit, (this.page + 1) * this.limit);
  }

  incrementPage() {
    ++this.chunkOptions.page;
  }

  decrementPage() {
    --this.chunkOptions.page;
  }

  clearDownloadItems() {
    this.downloadItems$$.next([]);
  }

  addToDownloadItems(item: string) {
    this.downloadItems$$.next([...this.downloadItems$$.value, item]);
  }

  removeFromDownloadList(item: string) {
    this.downloadItems$$.next(this.downloadItems$$.value.filter((elem) => elem !== item));
  }

  downloadItemsArr(): Observable<Blob> {
    return this.http.post(`${this.SERVER_URL}/file/images/meme/zip`, this.downloadItems$$.value, {
      responseType: "blob",
      observe: "body"
    });
  }

  updateGalleryList() {
    this.galleryCards$$.next([...this.galleryCards$$.value, ...this.getChunk(this.galleryItems)])
  }
}
