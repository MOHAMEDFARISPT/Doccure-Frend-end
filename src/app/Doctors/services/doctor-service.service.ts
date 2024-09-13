import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../GolbalStore/global.model';
import { doctorLogin, doctorRegistration, doctorResponse, loginDoctorResponse } from '../Doctors-Interfaces/DoctorInterface';
import { environment } from '../../../Environement/environment';
import { Slot } from '../../Admin/interfaces/interface';

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
  return result
}



saveSlot(slotData: Slot){
  const doctor = localStorage.getItem('Doctor');
  let payload;
  if(doctor){
    let parsed=JSON.parse(doctor)
    let doctorId=parsed._id

   payload = { ...slotData, doctorId };
 

  }

   
  return this.http.post<any>(`${this.apiUrl}/Doctors/available-slots`, payload);
  
}



deleteAllSlots(day:string){

  const doctor = localStorage.getItem('Doctor');
  let doctorId;
  if(doctor){
    let parsed=JSON.parse(doctor)
   doctorId=parsed._id

  }

  return this.http.post<any>(`${this.apiUrl}/Doctors/deleteSlots`,{day:day,doctorId:doctorId})

}







}
