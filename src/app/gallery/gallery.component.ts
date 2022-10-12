import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

export interface GalleryTab {
  label?: string;
  tiles?: Tile[];
}

export interface Tile {
  src: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  asyncTabs: Observable<GalleryTab[]> | undefined;
  defaultTabIndex = 0;
  tiles: Tile[] = [];

  constructor(private translate: TranslateService) {
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
    let names = ['bouquet', 'wreath', 'ikebana', 'decoration', 'box'];

    this.tiles = [
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}1.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}2.jpg` },
      { cols: 2, rows: 2, src: `../../assets/images/${names[event.index]}/${names[event.index]}3.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}4.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}5.jpg` },
      { cols: 2, rows: 2, src: `../../assets/images/${names[event.index]}/${names[event.index]}6.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}7.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}8.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}9.jpg` },
      { cols: 1, rows: 1, src: `../../assets/images/${names[event.index]}/${names[event.index]}10.jpg` },
    ]
  }
}
