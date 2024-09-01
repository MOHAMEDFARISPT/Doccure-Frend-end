import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from '../../../sharedComponents/Components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginRequest } from '../../Store/doctor.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [RouterModule,NavbarComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.css'
})
export class DoctorLoginComponent implements OnInit {



  DoctorLoginForm!:FormGroup;

constructor(
  private fb:FormBuilder,
  private store:Store

){}

ngOnInit(): void {
  this.DoctorLoginForm=this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  
}


onSubmit() {
  if(this.DoctorLoginForm.valid){
    
    const {email,password}=this.DoctorLoginForm.value
    alert(email)
    alert(password)
    this.store.dispatch(loginRequest({email,password}))
    
  }

}












}
