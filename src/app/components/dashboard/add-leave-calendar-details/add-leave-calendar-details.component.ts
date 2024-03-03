import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveCalendar } from 'src/app/models/LeaveCalendar';
import { LeaveCalendarService } from 'src/app/services/leave-calendar/leave-calendar.service';

@Component({
  selector: 'app-add-leave-calendar-details',
  templateUrl: './add-leave-calendar-details.component.html',
  styleUrls: ['./add-leave-calendar-details.component.css']
})
export class AddLeaveCalendarDetailsComponent {
  leaveCalendar: LeaveCalendar = {
    date: new Date,
    leaveType: '',
    description: '',
    added_by: '',
    id: 0,
    createdAt: new Date,
    updatedAt: new Date
  };

  constructor(
    private leaveCalendarService: LeaveCalendarService,
    private snackBar: MatSnackBar
  ) {}

  addLeaveCalendar() {
    // Set added_by field using value from localStorage
    this.leaveCalendar.added_by = localStorage.getItem("auth-user") || '';

    this.leaveCalendarService.addleaveCalendar(this.leaveCalendar).subscribe(
      (response) => {
        console.log('Leave calendar added successfully:', response);
        this.openSnackBar('Leave calendar added successfully');
      },
      (error) => {
        console.error('Error adding leave calendar:', error);
        this.openSnackBar('Error adding leave calendar');
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // Position horizontally
      verticalPosition: 'top' // Position vertically
    });
  }
}
