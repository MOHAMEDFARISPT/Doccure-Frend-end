import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  
 
  private apiUrl ='http://localhost:3000/Admin'
  constructor(private http:HttpClient){}
  login(value: any) {
    throw new Error('Method not implemented.');
  }


  getPatients():Observable<any[]> {
  
    return this.http.get<any[]>(`${this.apiUrl}/getPatients`) 
  }

  getDoctorDetails():Observable<any[]> {

    const response= this.http.get<any[]>(`${this.apiUrl}/Doctor-Requests`);
    console.log("response",response)
    return response
     
  }

  acceptDoctorRequest(doctorId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Accept-Request`, { id: doctorId });
  }

  

  



  
}
