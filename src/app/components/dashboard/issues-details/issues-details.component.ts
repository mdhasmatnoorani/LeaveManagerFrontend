import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Issue } from 'src/app/models/Issue';
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-issues-details',
  templateUrl: './issues-details.component.html',
  styleUrls: ['./issues-details.component.css']
})
export class IssuesDetailsComponent {

  issue: Issue[];
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  paginatedData: Issue[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private issueService: IssueService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllIssues();
  }

  getAllIssues() {
    let resp = this.issueService.getAllIssues();
    resp.subscribe(
      (data: any) => {
        this.issue = data;
        this.paginateData();
        console.log("Issues" + data);
      },
      (error) => {
        console.error('Error fetching all issues details: ', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateData();
  }

  paginateData() {
    if (this.issue) {
      const startIndex = this.pageIndex * this.pageSize;
      this.paginatedData = this.issue.slice(startIndex, startIndex + this.pageSize);
    }
  }

  calculateStartIndex(): number {
    return (this.pageIndex * this.pageSize) + 1;
  }

  calculateEndIndex(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.issue.length);
  }

  calculateSerialNumber(indexOnPage: number): number {
    return indexOnPage + 1 + this.pageIndex * this.pageSize;
  }

  downloadUsersData() {
    let resp = this.issueService.downloadIssuesData();
    resp.subscribe(
      (data: any) => {
        if (data instanceof Blob) {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);

          // Create a link and trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'issues_data.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      },
      (error: any) => {
        console.error('Error downloading all issues data: ', error);
      }
    );
  }

}
