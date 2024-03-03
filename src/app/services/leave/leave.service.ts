import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leave } from 'src/app/models/Leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private readonly API_URL = 'http://localhost:8081/api/v1/leave';
  private emp: string;

  constructor(private http: HttpClient) {
    this.emp = localStorage.getItem("auth-user") || '';
  }

  private getTokenHeader() {
    const token = localStorage.getItem("auth-user-token") || '';
    return new HttpHeaders({ "Authorization": "Bearer " + token });
  }

  getApprovedListCount() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/total-approved`, { headers: header, responseType: "text" });
  }

  getRejectedLeavesCount() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/total-rejected`, { headers: header, responseType: "text" });
  }

  getAllLeaves() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/all`, { headers: header, responseType: "json" });
  }

  getAllLeavesCount() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/total-leaves`, { headers: header, responseType: "json" });
  }

  downloadLeaveData() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/download-excel`, { headers: header, responseType: "blob" });
  }

  downloadLeaveDataForEmployee() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/excel/${this.emp}`, { headers: header, responseType: "blob" });
  }

  approveLeave(leaveId: string) {
    const header = this.getTokenHeader();
    return this.http.post<Leave>(`${this.API_URL}/approve?leaveId=${leaveId}`, null, { headers: header });
  }

  rejectLeave(leaveId: string) {
    const header = this.getTokenHeader();
    return this.http.post<Leave>(`${this.API_URL}/reject?leaveId=${leaveId}`, null, { headers: header });
  }

  getLeaveStatus(leaveId: string) {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/reject?leaveId=${leaveId}`, { headers: header, responseType: "text" });
  }

}