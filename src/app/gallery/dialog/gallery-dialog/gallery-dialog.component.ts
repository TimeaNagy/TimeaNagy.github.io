import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html'
})
export class GalleryDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { src: string }, private dialogRef: MatDialogRef<GalleryDialogComponent>) { }

  close() {
    this.dialogRef.close();
  }

}
