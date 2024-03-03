import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent {
  constructor(
    private userService: UserService,
    private leaveService: LeaveService,
    private snackBar: MatSnackBar
  ) { }

  currentTime: string = "";
  totalEmployeeCount: number;
  approvedLeavesCount: number;
  rejectedLeavesCount: number;
  allLeavesCount: number;
  leave: Leave[];
  selectedPageSize: number = 10; // default value, you can set it based on your preference


  // Pagination properties
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  paginatedData: Leave[];

  // ViewChild decorator to get a reference to the paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.updateTime(); // Initial call to set the current time
    setInterval(() => {
      this.updateTime();
    }, 1000); // Update time every second

    this.getAllLeaves();

    // Fetch initial data
    this.getTotalEmployeeCount();
    this.getApprovedLeavesCount();
    this.getRejectedLeavesCount();
    this.getAllLeaves();
    this.getAllLeavesCount();
    this.selectedPageSize = this.pageSize;

    // Set the paginator after the view initialization
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.pageSize = this.pageSize;
        this.paginator.length = this.allLeavesCount;

        // Initialize paginatedData with the first page of data
        this.paginateData();
      }
    });
  }


  ngAfterViewInit() {
    // Check if paginator is defined before subscribing
    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.paginateData();
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateData();
  }

paginateData() {
  if (this.leave) {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedData = this.leave.slice(startIndex, startIndex + this.pageSize);
  }
}
  calculateStartIndex(): number {
    return (this.pageIndex * this.pageSize) + 1;
  }

  calculateEndIndex(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.allLeavesCount);
  }

  onPageSizeChange() {
    this.pageSize = this.selectedPageSize;
    this.paginator.pageSize = this.pageSize; // Update paginator's pageSize
    this.paginateData(); // Repaginate the data based on the new page size
  }

  private updateTime(): void {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();

    const dayOfWeek = daysOfWeek[now.getDay()];
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    const seconds = this.padZero(now.getSeconds());

    this.currentTime = `${dayOfWeek}, ${hours}:${minutes}:${seconds}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


  getTotalEmployeeCount() {
    let resp = this.userService.getTotalEmployeesCount();
    resp.subscribe(
      (data) => {
        this.totalEmployeeCount = +data; // Convert the response to a number

      },
      (error) => {
        console.error('Error fetching total employees: ', error);
      }
    );
  }

  getApprovedLeavesCount() {
    let resp = this.leaveService.getApprovedListCount();
    resp.subscribe(
      (data) => {
        this.approvedLeavesCount = +data; // Convert the response to a number

      },
      (error) => {
        console.error('Error fetching list of approved leaves: ', error);
      }
    );
  }

  getRejectedLeavesCount() {
    let resp = this.leaveService.getRejectedLeavesCount();
    resp.subscribe(
      (data) => {
        this.rejectedLeavesCount = +data; // Convert the response to a number

      },
      (error) => {
        console.error('Error fetching list of rejected leaves: ', error);
      }
    );
  }

  getAllLeavesCount() {
    let resp = this.leaveService.getAllLeavesCount();
    resp.subscribe(
      (data) => {
        this.allLeavesCount = +data; // Convert the response to a number

      },
      (error) => {
        console.error('Error fetching list of rejected leaves: ', error);
      }
    );
  }

  getAllLeaves() {
    let resp = this.leaveService.getAllLeaves();
    resp.subscribe(
      (data: any) => {
        this.leave = data;
        // Initialize paginatedData with the first page of data
        this.paginateData();
      },
      (error: any) => {
        console.error('Error fetching list of rejected leaves: ', error);
      }
    );
  }

  downloadLeaveData() {
    let resp = this.leaveService.downloadLeaveData();
    resp.subscribe(
      (data: any) => {
        if (data instanceof Blob) {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);

          // Create a link and trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'leave_data.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      },
      (error: any) => {
        console.error('Error downloading leave data: ', error);
      }
    );
  }

  downloadLeaveDataForEmployee() {
    let resp = this.leaveService.downloadLeaveDataForEmployee();
    resp.subscribe(
      (data: any) => {
        if (data instanceof Blob) {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);

          // Create a link and trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'leave_data.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      },
      (error: any) => {
        console.error('Error downloading leave data: ', error);
      }
    );
  }

  calculateSerialNumber(indexOnPage: number): number {
    return indexOnPage + 1 + this.pageIndex * this.pageSize;
  }



  fetchLeaveStatus(leaveId: string, leaveIndex: number) {
    this.leaveService.getLeaveStatus(leaveId).subscribe(
      (status: string) => {
        // Update the isApproved property of the corresponding leave item
        this.leave[leaveIndex].isApproved = status;
      },
      (error) => {
        console.error('Error fetching leave status:', error);
      }
    );
  }

  approveLeave(leaveId: string) {
    this.leaveService.approveLeave(leaveId).subscribe(
      (approvedLeave: Leave) => {
        const index = this.leave.findIndex((l) => l.leaveId === approvedLeave.leaveId);
        if (index !== -1) {
          this.leave[index] = approvedLeave;
          this.snackBar.open('Leave approved successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center', // Position horizontally
            verticalPosition: 'top' // Position vertically
          });
        }
        this.paginateData();
      },
      (error) => {
        console.error('Error approving leave: ', error);
        this.snackBar.open('Error approving leave. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
      }
    );
  }

  rejectLeave(leaveId: string) {
    this.leaveService.rejectLeave(leaveId).subscribe(
      (rejectedLeave: Leave) => {
        const index = this.leave.findIndex((l) => l.leaveId === rejectedLeave.leaveId);
        if (index !== -1) {
          this.leave[index] = rejectedLeave;
          this.snackBar.open('Leave rejected successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center', // Position horizontally
            verticalPosition: 'top' // Position vertically
          });
        }
        this.paginateData();
      },
      (error) => {
        console.error('Error rejecting leave: ', error);
        this.snackBar.open('Error rejecting leave. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
      }
    );
  }

}
