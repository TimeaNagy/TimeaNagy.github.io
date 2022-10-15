import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import SwiperCore, { Pagination, Navigation, Grid, SwiperOptions } from "swiper";
import { GalleryDialogComponent } from './dialog/gallery-dialog/gallery-dialog.component';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Pagination, Navigation, Grid]);

export interface GalleryTab {
  label: string;
}

export interface Tile {
  src: string;
}

interface ISize {
  width: number; height: number;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  asyncTabs: Observable<GalleryTab[]>;
  defaultTabIndex = 0;
  tiles: Tile[] = [];

  config: SwiperOptions = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    grid: { rows: 2, fill: 'row' },
    spaceBetween: 15,
    grabCursor: true,
    pagination: { clickable: true, dynamicBullets: true },
    observer: true,
    observeParents: true
  };

  folderInfo = [
    { name: 'bouquet', pictureCount: 99 },
    { name: 'wreath', pictureCount: 71 },
    { name: 'ikebana', pictureCount: 22 },
    { name: 'decoration', pictureCount: 46 },
    { name: 'box', pictureCount: 58 }
  ];

  constructor(private translate: TranslateService, public dialog: MatDialog) {
    this.asyncTabs = new Observable((observer: Observer<GalleryTab[]>) => {
      this.translate
        .get(['galleryBouquets', 'galleryWreaths', 'galleryIkebana', 'galleryDecorations', 'galleryBoxes'])
        .subscribe(data => {
          observer.next([
            { label: data['galleryBouquets'] },
            { label: data['galleryWreaths'] },
            { label: data['galleryIkebana'] },
            { label: data['galleryDecorations'] },
            { label: data['galleryBoxes'] }
          ]);
        })
    });

    this.selectedTabChanged({ index: this.defaultTabIndex });
  }

  selectedTabChanged(event: any) {
    this.tiles = [];

    console.log(this.swiper?.swiperRef.slides.length)
    for (var i = 1; i <= this.folderInfo[event.index].pictureCount; i++) {
      this.tiles = [...this.tiles, { src: `../../assets/images/${this.folderInfo[event.index].name}/${this.folderInfo[event.index].name}${i}.jpg` }];
      this.swiper?.swiperRef.updateSlides();
    }
  }

  openDialog({ src }: Tile): void {
    this.dialog.open(GalleryDialogComponent, {
      data: { src }
    });
  }

  swipePrev() {
    this.swiper?.swiperRef.slidePrev();
  }
  swipeNext() {
    this.swiper?.swiperRef.slideNext();
  }
}
