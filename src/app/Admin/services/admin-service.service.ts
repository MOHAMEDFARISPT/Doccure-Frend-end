import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  
 
  private apiUrl =environment.apiUrl
  constructor(private http:HttpClient){}
  login(value: any) {
    throw new Error('Method not implemented.');
  }


  getPatients():Observable<any[]> {
  
    return this.http.get<[]>(`${this.apiUrl}/Admin/getPatients`) 
  }

  getDoctorDetails():Observable<any[]> {
    const response= this.http.get<any[]>(`${this.apiUrl}/Admin/Doctor-Requests`);
    return response
     
  }

  acceptDoctorRequest(doctorId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Admin/Accept-Request`, { id: doctorId });
  }

  

  



  
}
