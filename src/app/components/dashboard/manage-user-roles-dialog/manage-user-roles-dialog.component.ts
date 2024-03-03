import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-user-roles-dialog',
  templateUrl: './manage-user-roles-dialog.component.html',
  styleUrls: ['./manage-user-roles-dialog.component.css']
})
export class ManageUserRolesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ManageUserRolesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
