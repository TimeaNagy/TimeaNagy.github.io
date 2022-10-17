import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GalleryDialogComponent } from './dialog/gallery-dialog/gallery-dialog.component';

export interface Tile {
  src: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent {
  tiles: Tile[] = [];
  defaultTabIndex = 0;
  selectedTabIndex = 0;

  tabs = [
    { label: 'galleryBouquets' },
    { label: 'galleryWreaths' },
    { label: 'galleryIkebana' },
    { label: 'galleryDecorations' },
    { label: 'galleryBoxes' }
  ];

  folderInfo = [
    { name: 'bouquet', pictureCount: 99 },
    { name: 'wreath', pictureCount: 71 },
    { name: 'ikebana', pictureCount: 22 },
    { name: 'decoration', pictureCount: 46 },
    { name: 'box', pictureCount: 58 }
  ];

  constructor(public dialog: MatDialog, private elem: ElementRef) {
    this.elem.nativeElement.style.setProperty('--picture-count', this.folderInfo[this.selectedTabIndex].pictureCount)
    this.selectedTabChanged({ index: this.defaultTabIndex });
  }

  selectedTabChanged(event: any) {
    this.tiles = [];
    this.selectedTabIndex = event.index;

    for (let i = 1; i <= this.folderInfo[event.index].pictureCount; i++) {
      this.tiles = [...this.tiles, { src: `../../assets/images/${this.folderInfo[event.index].name}/${this.folderInfo[event.index].name}${i}.jpg` }]
    }
  }

  openDialog({ src }: Tile): void {
    this.dialog.open(GalleryDialogComponent, {
      data: { src }
    });
  }
}
