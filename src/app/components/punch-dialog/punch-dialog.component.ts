import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-punch-dialog',
  templateUrl: './punch-dialog.component.html',
  styleUrls: ['./punch-dialog.component.css']
})
export class PunchDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) { }
}
