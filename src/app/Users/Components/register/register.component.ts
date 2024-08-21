import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { noWhitespaceValidator,PasswordMatchValidator } from '../../utility/formvalidation';
import { UserServicesService } from '../../services/user-services.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,HttpClientModule,
    
   


  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

userForm!: FormGroup ;
submitted = false;
isLoading: boolean = false;

constructor(private fb: FormBuilder,private userService:UserServicesService) {}

ngOnInit(): void {
  this.userForm = this.fb.group({
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(3),noWhitespaceValidator()])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(3),noWhitespaceValidator()])],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8),noWhitespaceValidator()]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: PasswordMatchValidator('password', 'confirmPassword')   //constum validation for password and custompassword
  });
}

onSubmit() {
  this.submitted=true
  if(!this.userForm.invalid){
    this.userService.registerUser(this.userForm.value).subscribe({
      next:(response)=>{
        if(response.success){
          console.log("response",response)
          // this.toasterService.showSuccess(response.message)
        }
       
      },
      error:(error)=>{
      
        
        console.log("error",error.error.message)
        // this.toasterService.showError(error.error.message)

      }

    })
   
    
  
  }
  this.userForm.markAllAsTouched()

      
      
   
   
    
  
   

  
  
  }
 




  }






