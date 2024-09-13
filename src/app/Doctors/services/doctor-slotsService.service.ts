import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';




@Injectable({
  providedIn: 'root'
})
export class DoctorSlotService {
   
    private apiUrl=environment.apiUrl


    constructor(private http:HttpClient) { } 


    getSlots(day:string):Observable<any>{
        const doctor = localStorage.getItem('Doctor');
        let doctorId;
        if(doctor){
          let parsed=JSON.parse(doctor)
         doctorId=parsed._id
      
        }
      
        return this.http.post<any>(`${this.apiUrl}/Doctors/getSlots`,{day:day,doctorId:doctorId})
  
      }
    
    saveSlotData(slotData: any): Observable<any> {
    const doctor = localStorage.getItem('Doctor');
    let payload;
    if(doctor){
      let parsed=JSON.parse(doctor)
      let doctorId=parsed._id
  
     payload = { ...slotData, doctorId };
    }
    return  this.http.post(`${this.apiUrl}/Doctors/available-slots`, payload);
      }




   deleteSlot(data: { Slotid: string; day: string; }) {
   const doctor = localStorage.getItem('Doctor');
    let payload;
    if(doctor){
      let parsed=JSON.parse(doctor)
      let doctorId=parsed._id
  
     payload = { ...data, doctorId };
   }
   return this.http.post(`${this.apiUrl}/Doctors/deleteSlot`,payload)


 } 


 deleteAllSlots(day:string){
    const doctor = localStorage.getItem('Doctor');
    let payload;
    if(doctor){
        let parsed=JSON.parse(doctor)
        let doctorId=parsed._id
        payload={day,doctorId}
    }
    return this.http.post(`${this.apiUrl}/Doctors/deleteAllslots`,payload)
 }


}

