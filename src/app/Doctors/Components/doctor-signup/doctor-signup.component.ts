import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from '../../../sharedComponents/Components/footer/footer.component';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { doctorRegistration, generalDetails, personalDetails, professionalDetails } from '../../Doctors-Interfaces/DoctorInterface';
import { PasswordMatchValidator } from '../../../Users/utility/formvalidation';



@Component({
  selector: 'app-doctor-signup',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,NavbarComponent,FooterComponent,FormsModule],
  templateUrl: './doctor-signup.component.html',
  styleUrl: './doctor-signup.component.css'
})
export class DoctorSignupComponent implements OnInit   {

  backtologin=false
  step:number=1;
  personalDetailsForm!: FormGroup;
  generalDetailsForm!: FormGroup;
  professionalDetailsForm!: FormGroup;




  doctorRegistrationDto: doctorRegistration = {
    personalDetails: {} as personalDetails,
    generalDetails: {} as generalDetails,
    professionalDetails: {} as professionalDetails,
  
  };
  constructor(
    private doctorService:DoctorServiceService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router
  
  ){}


  



    


  

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      contactNumber: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordMatchValidator });


    this.generalDetailsForm = this.fb.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      adharNumber: ['', Validators.required],
    });



    this.professionalDetailsForm = this.fb.group({
      medicalLicenceNumber: ['', Validators.required],
      totalExperience: ['', Validators.required],
      patientsPerDay: ['', Validators.required],
      specialisedDepartment:['',Validators.required],
      consultationFee: ['', Validators.required],

    });



  






  }


  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
   }
 



  nextStep() {
    if (this.step === 1) {
      if (this.personalDetailsForm.valid) {
        this.doctorRegistrationDto.personalDetails = this.personalDetailsForm.value;
        this.step++;
      } else {
        this.toastr.error('Please fill out all required fields in personal details.');
      }
    } else if (this.step === 2) {
      if (this.generalDetailsForm.valid) {
        this.doctorRegistrationDto.generalDetails = this.generalDetailsForm.value;
        this.step++;
      } else {
        this.toastr.error('Please fill out all required fields in general details.');
      }
    } else if (this.step === 3) {
      if (this.professionalDetailsForm.valid) {
        this.doctorRegistrationDto.professionalDetails = this.professionalDetailsForm.value;
        this.submitRegistration(); 
      } else {
        this.toastr.error('Please fill out all required fields in professional details.');
      }
    } 
    
  }
  submitRegistration() {
    this.doctorService.RegisterDoctor(this.doctorRegistrationDto).subscribe(

      response => {
        if(response.success){
          this.step=4;
        this.toastr.success(response.message)

        }else{
          if(response.message==='Doctor already exists Please login'){
            this.backtologin=true
            this.toastr.error(response.message)

          }
         
          
        }
       
      },
      error => {
        
      }
    );
  }

  




}