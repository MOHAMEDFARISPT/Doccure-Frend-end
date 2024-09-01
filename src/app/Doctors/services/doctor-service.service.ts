import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorRegData } from '../../shared/interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  private apiUrl='http://localhost:3000/Doctors'

  constructor(private http:HttpClient) { }



  RegisterDoctor(doctorRegData: any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Doctor-Register`,doctorRegData)
    
 }

 loginDoctor(LoginData:any):Observable<any>{
  return this.http.post<any>(`${this.apiUrl}/Doctor-login`,{email:LoginData.email,password:LoginData.password})
 }

}
