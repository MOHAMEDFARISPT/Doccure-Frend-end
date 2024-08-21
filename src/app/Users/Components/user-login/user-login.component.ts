import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { noWhitespaceValidator } from '../../utility/formvalidation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  userForm!: FormGroup;



  constructor(private fb: FormBuilder, private userService: UserServicesService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),noWhitespaceValidator()]]
    });
  }


  onSubmit(){

if(!this.userForm.invalid){
  this.userService.loginUser(this.userForm.value).subscribe({
    next:(response: any)=>{

     const token=response.access_Token
     if(token){
      localStorage.setItem('authToken', token);
     }
     alert("login SuccessFully")

    
    

      
    },
    error:(error)=>{
      alert(error)

    }
    
  })
}
this.userForm.markAllAsTouched()


  }







}
