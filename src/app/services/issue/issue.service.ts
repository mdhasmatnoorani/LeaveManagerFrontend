import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private readonly API_URL = 'http://localhost:8081/api/v1/issue';

  constructor(private http: HttpClient) { }

  private getTokenHeader(): HttpHeaders {
    const token = localStorage.getItem("auth-user-token") || ''; 
    return new HttpHeaders({ "Authorization": "Bearer " + token });
  }

  getAllIssues() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/all`, { headers: header, responseType: "json" });
  }

  getTotalIssueCount() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/total`, { headers: header, responseType: "text" });
  }

  downloadIssuesData() {
    const header = this.getTokenHeader();
    return this.http.get(`${this.API_URL}/download-excel`, { headers: header, responseType: "blob" });
  }
}
