import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    // Check if the user is logged in
    if (!localStorage.getItem('auth-user-token')) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }

    // Retrieve user information from localStorage
    const authUserRole = localStorage.getItem("auth-user-role");

    // Check if the user has the admin role
    if (authUserRole == 'Admin') {
      return true; // Allow access to the dashboard
    } else {
      this.router.navigate(['/unauthorized']); // Navigate to unauthorized page
      return false; // Deny access
    }
  }
}
