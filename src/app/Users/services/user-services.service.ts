import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';
import { loginResponse } from '../../shared/interfaces/Auth';
import { loginSuccess } from '../Store/User/user.actions';
import { User } from '../../GolbalStore/global.model';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
private apiUrl ='http://localhost:3000/users'

  constructor(private http: HttpClient) {}


  googleAuthentication(user: any):Observable<any>{
    const response=this.http.post<{User:User,Token:string}>(`${this.apiUrl}/googlelogin`,user)
    console.log("Response//",response)
    return response
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/loadUserDatas`);
  }



  // Method to send form data to the backend
  registerUser(userData: User): Observable<any> {
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
