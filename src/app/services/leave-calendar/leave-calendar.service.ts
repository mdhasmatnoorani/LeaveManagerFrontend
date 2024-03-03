import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LeaveCalendar } from 'src/app/models/LeaveCalendar';

@Injectable({
  providedIn: 'root'
})
export class LeaveCalendarService {

  private readonly API_URL = 'http://localhost:8081/api/v1/leave-calendar';

  constructor(private http: HttpClient) { }

  private getTokenHeader(): HttpHeaders {
    const token = localStorage.getItem("auth-user-token") || '';
    return new HttpHeaders({ "Authorization": "Bearer " + token });
  }

  getAllLeaveCalendarDates(): Observable<any[]> {
    const header = this.getTokenHeader();
    return this.http.get<any[]>(`${this.API_URL}/all`, { headers: header, responseType: "json" }).pipe(
      catchError(error => {
        console.error('Error fetching leave events:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  
  addleaveCalendar(leaveCalendar: LeaveCalendar): Observable<LeaveCalendar> {
    const header = this.getTokenHeader();
    return this.http.post<LeaveCalendar>(`${this.API_URL}/add`, leaveCalendar, { headers: header });
  }
  
}
