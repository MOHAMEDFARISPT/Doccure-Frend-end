import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
private apiUrl ='http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  // Method to send form data to the backend
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  //login request
  loginUser(loginData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,loginData)
  }
 
}
