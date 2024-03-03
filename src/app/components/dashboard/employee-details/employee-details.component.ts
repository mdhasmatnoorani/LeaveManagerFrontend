import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PunchDialogComponent } from '../../punch-dialog/punch-dialog.component';
import { ManageUserRolesDialogComponent } from '../manage-user-roles-dialog/manage-user-roles-dialog.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  user: User[];
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  paginatedData: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getAllEmployees() {
    let resp = this.userService.getAllEmployees();
    resp.subscribe(
      (data: any) => {
        this.user = data;
        this.paginateData();
      },
      (error) => {
        console.error('Error fetching all employees details: ', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateData();
  }

  paginateData() {
    if (this.user) {
      const startIndex = this.pageIndex * this.pageSize;
      this.paginatedData = this.user.slice(startIndex, startIndex + this.pageSize);
    }
  }

  calculateStartIndex(): number {
    return (this.pageIndex * this.pageSize) + 1;
  }

  calculateEndIndex(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.user.length);
  }

  calculateSerialNumber(indexOnPage: number): number {
    return indexOnPage + 1 + this.pageIndex * this.pageSize;
  }


  onPageSizeChange() {
    this.paginator.pageIndex = 0; // Reset pageIndex when changing pageSize
    this.paginateData();
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(PunchDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this employee?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // will iomplement deletion logic here
      }
    });
  }

  openManageRolesDialog(): void {
    const dialogRef = this.openDialog({
      title: 'Update User Role',
      // message: 'Custom message for managing user roles.'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle saving roles logic here
      }
    });
  }
  

  private openDialog(data: any): MatDialogRef<ManageUserRolesDialogComponent> {
    return this.dialog.open(ManageUserRolesDialogComponent, {
      width: '25rem',
      data: data,
    });
  }

  downloadUsersData() {
    let resp = this.userService.downloadAllUsersData();
    resp.subscribe(
      (data: any) => {
        if (data instanceof Blob) {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);

          // Create a link and trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'users_data.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      },
      (error: any) => {
        console.error('Error downloading all users data: ', error);
      }
    );
  }
  
}
