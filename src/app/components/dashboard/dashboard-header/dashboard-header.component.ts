import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {

  constructor(private router: Router){}

  ngOnInit() {
    this.updateTime(); // Initial call to set the current time
    setInterval(() => {
      this.updateTime();
    }, 1000); // Update time every second
  }

  currentTime: string = "";
  greeting: string = "";

  private updateTime(): void {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();

    const dayOfWeek = daysOfWeek[now.getDay()];
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    const seconds = this.padZero(now.getSeconds());

    this.currentTime = `${dayOfWeek}, ${hours}:${minutes}:${seconds}`;

    const currentHour = now.getHours();
    if (currentHour < 12) {
      this.greeting = "Good Morning, " + this.getUsernameFromToken();
    } else if (currentHour < 18) {
      this.greeting = "Good Afternoon, " + this.getUsernameFromToken();
    } else {
      this.greeting = "Good Evening, " + this.getUsernameFromToken();
    }
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem("auth-user-role");
    return userRole === "Admin";
  }

  isEmployee(): boolean {
    const userRole = localStorage.getItem("auth-user-role");
    return userRole === "Employee";
  }

  getUsernameFromToken(){
  const userNameFromToken = localStorage.getItem("auth-user");
  if(userNameFromToken!= null){
  return userNameFromToken;
  }else{
    return "";
  }
  }

}
