import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../GolbalStore/global.model';
import { doctorLogin, doctorRegistration, doctorResponse, loginDoctorResponse } from '../Doctors-Interfaces/DoctorInterface';
import { environment } from '../../../Environement/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  private apiUrl=environment.apiUrl

  constructor(private http:HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/Doctors/loadDoctorDatas`);
  }

  RegisterDoctor(doctorRegData: doctorRegistration):Observable<doctorResponse> {
    return this.http.post<doctorResponse>(`${this.apiUrl}/Doctors/Doctor-Register`,doctorRegData)
    
 }

 loginDoctor(LoginData:doctorLogin):Observable<loginDoctorResponse>{
  const result= this.http.post<loginDoctorResponse>(`${this.apiUrl}/Doctors/Doctor-login`,{email:LoginData.email,password:LoginData.password})
  console.log("result??>>",result)
  return result
}

}
