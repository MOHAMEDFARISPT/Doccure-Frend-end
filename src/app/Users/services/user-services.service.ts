import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../Environement/environment';
import { Appointment, IWallet, loginResponse, proccedTopay, UserData } from '../Interfaces/userInterface'
import { loginSuccess } from '../Store/User/user.actions';
import { User } from '../../GolbalStore/global.model';
import {UserLoginData} from '../Interfaces/userInterface'
import { AvailableTimeResponse, commonResponse } from '../../Admin/interfaces/interface';
import { PatientManagementComponent } from '../../Admin/components/patient-management/patient-management.component';




@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
 
  proceedTopay(payload: { doctorId: string | undefined; slotId: string; }) {
    throw new Error('Method not implemented.');
  }
 
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


  loadUser(userId:string | null ):Observable<loginResponse> {
    return this.http.get<loginResponse>(`${this.apiUrl}/users/loaduserData`,{
      params:{userId:userId!}
    })

    
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
      console.log("drid",drid)
      console.log("selectedDay",selectedDay)

    return this.http.get<AvailableTimeResponse>(`${this.apiUrl}/users/available-times`, { params });
  }




    // Create Razorpay Order
    createOrder(amount: number, currency: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/users/createOrder`, {
        amount: amount,
        currency: currency,
      });
    }

     // Verify Razorpay Payment
  verifyPayment(paymentData: {
    order_id: string;
    payment_id: string;
    razorpay_signature: string;
  }): Observable<any> {
   
    return this.http.post(`${this.apiUrl}/users/verifypayment`, paymentData);
  }




    createAppointment(appointmentData: any): Observable<commonResponse> {
      return this.http.post(`${this.apiUrl}/users/createAppointment`, appointmentData);
  }


  getWallet(userId: string | undefined): Observable<IWallet> {
   return this.http.get<IWallet>(`${this.apiUrl}/users/getWallet/${userId}`);
  }

  loadAppointments(patinetId:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiUrl}/users/getAppointments`,{
      params:{
        patientId:patinetId
      }
    })

  }

  getAppointment(apmntId: string,userId:string ): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/users/getappointment`,{
      params:{
        apmntId:apmntId,
        userId:userId
 
      }})
      }




      cancellAppointment(appointmentId:string | null,userId:string | null,reason:string):Observable<commonResponse>{
        alert(appointmentId)
        alert(userId)
        alert(reason)
        const payload={
          appointmentId:appointmentId,
          userId:userId,
          reason:reason
        }
        return this.http.post<commonResponse>(`${this.apiUrl}/users/cancellAppointment`,payload)
      
      }
    }


   
  

    
  
  
 

