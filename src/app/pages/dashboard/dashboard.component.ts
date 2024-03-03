import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private userService: UserService,
    private leaveService: LeaveService,
    private router: Router,
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
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  paginatedData: Leave[];

  // ViewChild decorator to get a reference to the paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.updateTime(); // Initial call to set the current time
    setInterval(() => {
      this.updateTime();
    }, 1000); // Update time every second

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
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedData = this.leave.slice(startIndex, startIndex + this.pageSize);
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
      (error) => {
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
          console.log(data);
        }
      },
      (error) => {
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
          console.log(data);
        }
      },
      (error) => {
        console.error('Error downloading leave data: ', error);
      }
    );
  }

}
