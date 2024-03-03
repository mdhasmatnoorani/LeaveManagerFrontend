import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LeaveCalendarService } from 'src/app/services/leave-calendar/leave-calendar.service';

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.css'],
})
export class LeaveCalendarComponent implements OnInit {
  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth'
  };

  constructor(private leaveCalendarService: LeaveCalendarService) {}

  ngOnInit() {
    this.loadLeaveEvents();
  }

  loadLeaveEvents() {
    this.leaveCalendarService.getAllLeaveCalendarDates().subscribe(
      (data: any[]) => {
        const events = this.mapLeaveEvents(data);
        this.calendarOptions.events = events;
        console.log(events);
      },
      (error) => {
        console.error('Error fetching leave events:', error);
      }
    );
  }

  private mapLeaveEvents(data: any[]): any[] {
    return data.map(item => ({
      title: item.leaveType + ' - ' + item.description,
      start: item.date,
      end: item.date,
    }));
  }
}
