import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';
import { User } from 'firebase/auth';
import { commonResponse, doctorDetails } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  
 
  private apiUrl =environment.apiUrl
  constructor(private http:HttpClient){}
  login(value: {email:string,password:string}) {
    throw new Error('Method not implemented.');
  }


  getPatients():Observable<User[]> {
  
    return this.http.get<[]>(`${this.apiUrl}/Admin/getPatients`) 
  }

  getDoctorDetails():Observable<doctorDetails[]> {
    const response= this.http.get<doctorDetails[]>(`${this.apiUrl}/Admin/Doctor-Requests`);
    return response
     
  }

  acceptDoctorRequest(doctorId: string): Observable<commonResponse> {
    return this.http.post<commonResponse>(`${this.apiUrl}/Admin/Accept-Request`, { id: doctorId });
  }

  

  



  
}
