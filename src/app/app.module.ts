import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PunchDialogComponent } from './components/punch-dialog/punch-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LeaveFormComponent } from './components/dashboard/leave-form/leave-form.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { CardStatsComponent } from './components/dashboard/card-stats/card-stats.component';
import { LeaveRequestsComponent } from './components/dashboard/leave-requests/leave-requests.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { LeaveCalendarComponent } from './components/dashboard/leave-calendar/leave-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { ViewLeaveCalendarComponent } from './pages/view-leave-calendar/view-leave-calendar.component';
import { MyLeavesComponent } from './pages/my-leaves/my-leaves.component';
import { AddLeaveCalendarComponent } from './pages/add-leave-calendar/add-leave-calendar.component';
import { ReportIssuesComponent } from './pages/report-issues/report-issues.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { ViewEmployeesComponent } from './pages/view-employees/view-employees.component';
import { ReportIssueFormComponent } from './components/dashboard/report-issue-form/report-issue-form.component';
import { AddEmployeeFormComponent } from './components/dashboard/add-employee-form/add-employee-form.component';
import { EmployeeDetailsComponent } from './components/dashboard/employee-details/employee-details.component';
import { AddLeaveCalendarDetailsComponent } from './components/dashboard/add-leave-calendar-details/add-leave-calendar-details.component';
import { ManageUserRolesDialogComponent } from './components/dashboard/manage-user-roles-dialog/manage-user-roles-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { IssuesDetailsComponent } from './components/dashboard/issues-details/issues-details.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { MyLeaveDetailsComponent } from './components/dashboard/my-leave-details/my-leave-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PunchDialogComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    LeaveFormComponent,
    NavbarComponent,
    CardStatsComponent,
    LeaveRequestsComponent,
    DashboardHeaderComponent,
    LeaveCalendarComponent,
    ApplyLeaveComponent,
    ViewLeaveCalendarComponent,
    MyLeavesComponent,
    AddLeaveCalendarComponent,
    ReportIssuesComponent,
    ProfileComponent,
    AddEmployeeComponent,
    ViewEmployeesComponent,
    ReportIssueFormComponent,
    AddEmployeeFormComponent,
    EmployeeDetailsComponent,
    AddLeaveCalendarDetailsComponent,
    ManageUserRolesDialogComponent,
    IssuesDetailsComponent,
    IssuesComponent,
    MyLeaveDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FullCalendarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
