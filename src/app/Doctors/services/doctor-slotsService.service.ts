import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environement/environment';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../Store/doctor.state';
import { selectDoctor, selectLoading } from '../Store/doctor.store';
import { commonResponse, doctorDetails, slots } from '../../Admin/interfaces/interface';
import * as DoctorActions from '../Store/doctor.action'




@Injectable({
  providedIn: 'root'
})
export class DoctorSlotService {
    DoctorId$!: Observable<doctorDetails | null>;
    doctorid:string="hello"
   
    private apiUrl=environment.apiUrl


    constructor(private http:HttpClient,private store:Store<AuthState>) { } 


    getSlots(day:string,doctorId:string|undefined):Observable<any>{

   

        return this.http.post<any>(`${this.apiUrl}/Doctors/getSlots`,{day:day,doctorId:doctorId})
  
      }
    
    saveSlotData(slotData: any,doctorId:string |undefined): Observable<commonResponse> {
     const payload={...slotData,doctorId} 

     console.log("payload.slotData",slotData)
     console.log("doctorid",doctorId)
       
        return  this.http.post(`${this.apiUrl}/Doctors/available-slots`, payload);
    
    }
   
      




   deleteSlot(data: { Slotid: string; day: string,doctorId:string |undefined }) {
    const payload = { ...data };
    console.log("payload",payload)
    return this.http.post(`${this.apiUrl}/Doctors/deleteSlot`,payload)
   }
   


 deleteAllSlots(day:string,doctorId:string | undefined){
 
    return this.http.post(`${this.apiUrl}/Doctors/deleteAllslots`,{day,doctorid:doctorId })
 }



 } 




