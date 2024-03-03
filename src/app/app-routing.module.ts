import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './pages/my-leaves/my-leaves.component';
import { AddLeaveCalendarComponent } from './pages/add-leave-calendar/add-leave-calendar.component';
import { ViewLeaveCalendarComponent } from './pages/view-leave-calendar/view-leave-calendar.component';
import { ReportIssuesComponent } from './pages/report-issues/report-issues.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { ViewEmployeesComponent } from './pages/view-employees/view-employees.component';
import { IssuesComponent } from './pages/issues/issues.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "apply-leave", component: ApplyLeaveComponent },
  { path: "my-leaves", component: MyLeavesComponent },
  { path: "add-leave-calendar", component: AddLeaveCalendarComponent, canActivate: [AuthGuard] }, 
  { path: "view-leave-calendar", component: ViewLeaveCalendarComponent},
  { path: "add-employee", component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: "view-employee-details", component: ViewEmployeesComponent,  canActivate: [AuthGuard] },
  { path: "report-issues", component: ReportIssuesComponent },
  { path: "issues", component: IssuesComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
  
}
