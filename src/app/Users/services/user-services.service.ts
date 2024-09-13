import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';
import { loginResponse, UserData } from '../Interfaces/userInterface'
import { loginSuccess } from '../Store/User/user.actions';
import { User } from '../../GolbalStore/global.model';
import {UserLoginData} from '../Interfaces/userInterface'
import { AvailableTimeResponse } from '../../Admin/interfaces/interface';




@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  resendOtp(useremail: string) {
    throw new Error('Method not implemented.');
  }
private apiUrl =environment.apiUrl

  constructor(private http: HttpClient) {}


  googleAuthentication(user: any):Observable<any>{
    return this.http.post<{User:User,Token:string}>(`${this.apiUrl}/users/googlelogin`,user)
     
  }

  getUsers(): Observable<UserData[]> {

    return this.http.get<UserData[]>(`${this.apiUrl}/Admin/loadUserDatas`);
  }



  // Method to send form data to the backend
  registerUser(userData: UserData): Observable<{data:User,success:Boolean,message:string}> {
    return  this.http.post<{data:User,success:Boolean,message:string}>(`${this.apiUrl}/users/register`, userData);
 

  }

  verifyOtp(data: { otp: string, email: string }):Observable<{success:boolean,message:string}>{
    return this.http.post<{success:boolean,message:string}>(`${this.apiUrl}/users/verify-Otp`,data)
  }


  //login request
  loginUser(loginData:UserLoginData):Observable<loginResponse>{
    
    return  this.http.post<loginResponse>(`${this.apiUrl}/users/login`,loginData)
   
  
  
  }

  loadAvailableTime(drid: string, selectedDay: string): Observable<AvailableTimeResponse> {
    const params = new HttpParams()
      .set('drid', drid)
      .set('selectedDay', selectedDay);
    return this.http.get<AvailableTimeResponse>(`${this.apiUrl}/users/available-times`, { params });
  }

 
}
