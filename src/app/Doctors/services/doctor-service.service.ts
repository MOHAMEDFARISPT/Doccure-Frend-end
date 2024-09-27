import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Doctor } from '../../GolbalStore/global.model';
import { doctorLogin, doctorRegistration, doctorResponse, loginDoctorResponse } from '../Doctors-Interfaces/DoctorInterface';
import { environment,cloudinaryConfig } from '../../../Environement/environment';
import { commonResponse, Slot } from '../../Admin/interfaces/interface';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../../Users/Interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {


  private cloudinaryUrl = cloudinaryConfig.cloudinaryUrl
  private uploadPreset = 'Doccure'

  private apiUrl=environment.apiUrl

  constructor(private http:HttpClient,private troastr:ToastrService) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/Doctors/loadDoctorDatas`);
  }

  getAllAppointments():Observable<Appointment[]>{
   

  return this.http.get<Appointment[]>(`${this.apiUrl}/Doctors/loadAppointments`)
   

  
  }

  RegisterDoctor(doctorRegData: doctorRegistration):Observable<doctorResponse> {
    return this.http.post<doctorResponse>(`${this.apiUrl}/Doctors/Doctor-Register`,doctorRegData)
    
 }

 loginDoctor(LoginData:doctorLogin):Observable<loginDoctorResponse>{
  const result= this.http.post<loginDoctorResponse>(`${this.apiUrl}/Doctors/Doctor-login`,{email:LoginData.email,password:LoginData.password})
  return result
}

loadDoctor(DoctorId: string | null): Observable<doctorResponse> {
  if (!DoctorId) {
    throw new Error('DoctorId is required');
  }
  
  return this.http.get<doctorResponse>(`${this.apiUrl}/Doctors/loadDoctor`, {
    params: { DoctorId: DoctorId } 
  });
}





saveSlot(slotData: Slot){
  const doctor = localStorage.getItem('Doctor');
  let payload;
  if(doctor){
    let parsed=JSON.parse(doctor)
    let doctorId=parsed._id

   payload = { ...slotData, doctorId };
 

  }
  return this.http.post<commonResponse>(`${this.apiUrl}/Doctors/available-slots`, payload);
  
}




deleteAllSlots(day:string){

  const doctor = localStorage.getItem('Doctor');
  let doctorId;
  if(doctor){
    let parsed=JSON.parse(doctor)
   doctorId=parsed._id

  }

  return this.http.post<commonResponse>(`${this.apiUrl}/Doctors/deleteSlots`,{day:day,doctorId:doctorId})

}


uploadProfilePhoto(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file); 
  formData.append('upload_preset', this.uploadPreset); 

  return this.http.post<any>(this.cloudinaryUrl, formData).pipe(
    tap(response => {
      console.log('Upload Response:', response); 
      if (response && response.secure_url) {
        this.troastr.success('Profile Photo Uploaded Successfully');
        this.uploadProfile(response.secure_url).subscribe({
      next:(res)=>{
        alert(res)
      }
        })
      } else {
        this.troastr.error('Profile photo upload failed.');
      }
    }),
    catchError(error => {
      console.error('Upload Error:', error); // Debugging: log the error
      this.troastr.error('Profile photo upload failed.');
      throw error; // Rethrow the error for further handling if necessary
    })
  );
}
  uploadProfile(secure_url: any) {
   alert(secure_url)

  const doctor = localStorage.getItem('Doctor');
  let doctorId;
  if(doctor){
    let parsed=JSON.parse(doctor)
   doctorId=parsed._id

  }  
  alert(doctorId)

 
  return this.http.post<any>(`${this.apiUrl}/Doctors/profileUpload`,{secure_url:secure_url,doctorId:doctorId})
  }


  changepassword(oldPassword: string,newPassword: string,confirmPassword: string,doctorId: string | undefined): Observable<commonResponse> {
    
    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
      doctorId
    };
  
    // Make the POST request to the backend API
    return this.http.post<commonResponse>(`${this.apiUrl}/Doctors/changepassword`, payload);
  }



  loadAppointments(DoctorId:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiUrl}/Doctors/Appointments`,{
      params:{
        DoctorId:DoctorId
      }
    })

  }
  




}
