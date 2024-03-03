import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  ngOnInit() { }

  
  isAdmin(): boolean {
    const userRole = localStorage.getItem("auth-user-role");
    return userRole === "Admin";
  }

  isEmployee(): boolean {
    const userRole = localStorage.getItem("auth-user-role");
    return userRole === "Employee";
  }

  /* Logout */
  onLogout() {
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-user-token");
    localStorage.removeItem("auth-user-role");
    this.router.navigate(["/login"]);
  }
}
