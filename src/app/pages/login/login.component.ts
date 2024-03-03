import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PunchDialogComponent } from 'src/app/components/punch-dialog/punch-dialog.component';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthRes } from 'src/app/models/AuthRes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  doLogin(user: User) {
    let resp = this.authService.doAuth(user);
    resp.subscribe(
      (data: AuthRes) => {
        if (data && data.token) {
          localStorage.setItem("auth-user", user.empId);
          localStorage.setItem("auth-user-token", data.token);
          localStorage.setItem("auth-user-role", data.role);
          if (localStorage.getItem("auth-user-role") == "Admin") {
            this.router.navigate(["/dashboard"]);
          } else if ((localStorage.getItem("auth-user-role") == "Employee")) {
            this.router.navigate(["/apply-leave"]);
          } else {
            this.router.navigate(["/"]);
          }
        } else {
          this.openDialog("Error", "Authentication failed. Please check your username and password.");
        }
      },
      (error) => {
        this.openDialog("Error", "An error occurred during authentication. Please try again.");
      }
    );
  }

  private openDialog(title: string, message: string): void {
    this.dialog.open(PunchDialogComponent, {
      width: '25rem',
      data: { title, message },
    });
  }
}
