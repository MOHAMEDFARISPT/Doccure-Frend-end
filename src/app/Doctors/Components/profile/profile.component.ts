import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../Doctor-sharedComponent/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { parse } from 'dotenv';
import { DateTransformPipe } from "../../../date-transform.pipe";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../Store/doctor.state';
import { Store } from '@ngrx/store';
import *  as DoctorActions  from '../../Store/doctor.action'
import { selectDoctor } from '../../Store/doctor.store';
import { Observable } from 'rxjs';
import { commonResponse, doctorDetails } from '../../../Admin/interfaces/interface';
import { ToastrService } from 'ngx-toastr';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { DoctorReducer } from '../../Store/doctor.reducer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, CommonModule, DateTransformPipe,ReactiveFormsModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(
    private store:Store<AuthState>,
    private fb:FormBuilder,
    private toaster:ToastrService,
    private DoctorService:DoctorServiceService
  ){}
  Doctor$!:Observable<doctorDetails | undefined>

selectedButton: string = 'Personal Details';
passwordForm!: FormGroup;

  ngOnInit(): void {
     
    this.store.dispatch(DoctorActions.loadDoctor())
    this.Doctor$=this.store.select(selectDoctor)

    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSelect(buttonName: string): void {
    this.selectedButton = buttonName;
  }
  get f() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    let doctorId;
    alert()
    // Check if the form is valid
    if (this.passwordForm.valid) {
      this.Doctor$.subscribe((doctor)=>{
        doctorId=doctor?._id
      })
   const {oldPassword,newPassword,confirmPassword}=this.passwordForm.value;
   
      this.DoctorService.changepassword(oldPassword,newPassword,confirmPassword,doctorId).subscribe({
        next:(res:commonResponse)=>{
        if(res.success){
          this.toaster.success(res.message)
         
        }else{
          this.toaster.error(res.message)
        }
        }
      })
     
   }
  


}

}



 

