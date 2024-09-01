import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { noWhitespaceValidator } from '../../utility/formvalidation';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from '../../../sharedComponents/Components/footer/footer.component';
import { Store, StoreModule } from '@ngrx/store';
import { loginUser } from '../../Store/User/user.actions';
import { userreducer } from '../../Store/User/user.reducer';
import { Observable } from 'rxjs';
import { selectLoading } from '../../Store/User/user.selector';
import { SpinnerComponent } from '../../../sharedComponents/Components/spinner/spinner.component';
import { UserLoginData } from '../../../shared/interfaces/Auth';
import { LoginDTO } from '../../../shared/dtos/user.dto';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent
    

  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  userForm!: FormGroup;
  loading$!: Observable<boolean>;
  userLoaginData!:UserLoginData;
  


  constructor(private fb: FormBuilder, 
  private userService: UserServicesService,
  private router:Router,
  private store: Store,
) {
  this.loading$ = this.store.select(selectLoading);
}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),noWhitespaceValidator()]]
    });
  }


  onSubmit(){

if(!this.userForm.invalid){
  const {email,password}=this.userForm.value
  const loginDto=new LoginDTO(email,password)

if(loginDto.validate()){
  this.store.dispatch(loginUser({email: loginDto.email,password:loginDto.password}))

}
 
 
  
}
this.userForm.markAllAsTouched()


  }







}
