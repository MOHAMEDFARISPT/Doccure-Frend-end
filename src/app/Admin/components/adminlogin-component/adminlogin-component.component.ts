import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Users/utility/formvalidation';
import { AdminServiceService } from '../../services/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin-component',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './adminlogin-component.component.html',
  styleUrl: './adminlogin-component.component.css'
})
export class AdminloginComponent implements OnInit {
AdminForm!:FormGroup

  constructor(private formBuilder:FormBuilder,
   private  AdminService:AdminServiceService,
   private router:Router
  ){}

ngOnInit(): void {
  this.AdminForm=this.formBuilder.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(8),noWhitespaceValidator()]]
  });
}






  onSubmit(){
    if(!this.AdminForm.invalid){
      this.router.navigate(['/Admin-Dashboard'])
      console.log(this.AdminForm.value)
      this.AdminService.login(this.AdminForm.value)
    }else{
      this.AdminForm.markAllAsTouched()

    }
   

  }





}
