import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';
import { loginResponse } from '../../shared/interfaces/Auth';
import { loginSuccess } from '../Store/User/user.actions';

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

  verifyOtp(data: { otp: string, email: string }):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/verify-Otp`,data)
  }


  //login request
  loginUser(loginData:any):Observable<loginResponse>{
    
    return this.http.post<any>(`${this.apiUrl}/login`,loginData)
  }
 
}
