import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { noWhitespaceValidator,PasswordMatchValidator } from '../../utility/formvalidation';
import { UserServicesService } from '../../services/user-services.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from '../../../sharedComponents/Components/footer/footer.component';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,HttpClientModule,NavbarComponent,FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
step=1


userForm!: FormGroup ;
submitted = false;
otpForm!: FormGroup;
otpLength = 4; 
useremail!:string;
loading=false

constructor(private fb: FormBuilder,
  private userService:UserServicesService,
private router:Router,
private store:Store,
private toastr:ToastrService
) {}

ngOnInit(): void {
  this.userForm = this.fb.group({
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(3),noWhitespaceValidator()])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(3),noWhitespaceValidator()])],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    contactNumber:['',Validators.required],
    password: ['', [Validators.required, Validators.minLength(8),noWhitespaceValidator()]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: PasswordMatchValidator('password', 'confirmPassword')   //constum validation for password and custompassword
  });


  this.otpForm = this.fb.group({
    otp1: [''],
    otp2: [''],
    otp3: [''],
    otp4: ['']
  });




}

onInputChange(event: any, index: number): void {
  const input = event.target;
  if (input.value.length === 1 && index < this.otpLength) {
    const nextInput = document.getElementById(`otp${index + 1}`);
    if (nextInput) {
      nextInput.focus();
    }
  } else if (input.value.length === 0 && index > 1) {
    const previousInput = document.getElementById(`otp${index - 1}`);
    if (previousInput) {
      previousInput.focus();
    }
  }
}




onRegisterSubmit() {
  this.submitted = true;

  if (this.userForm.valid) {

    this.userService.registerUser( this.userForm.value ).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.useremail=res.data.email
          this.step += 1;
        } else {
          this.toastr.error(res.message);
          this.router.navigate(['/User-login']);
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred. Please try again.');
        console.error(err);
      }
    });
  } else {
    this.userForm.markAllAsTouched(); 
  }
}



onSubmitOtp() {
  this.loading=true
  const otpValue = Object.values(this.otpForm.value).join(''); // Get OTP value from form
  this.userService.verifyOtp({ otp: otpValue, email: this.useremail }).subscribe({
    next: (res) => {
      if (res.success) {
        this.router.navigate(['/User-login']);
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    },
    error: (err) => {
      console.error('Error occurred:', err);
      this.toastr.error('An error occurred while verifying the OTP.');
    }
  });
}



















  }






