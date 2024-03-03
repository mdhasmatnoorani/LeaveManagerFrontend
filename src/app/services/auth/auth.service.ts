import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRes } from 'src/app/models/AuthRes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  doAuth(user: User): Observable<AuthRes> {
    return this.http.post<AuthRes>("http://localhost:8081/api/v1/user/authenticate", user);
  }

}
