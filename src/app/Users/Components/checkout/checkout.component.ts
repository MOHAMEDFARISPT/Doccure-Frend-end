import { Component, HostListener, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { UserSlidebarComponent } from '../../../sharedComponents/Components/user-slidebar/user-slidebar.component';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../Guards/deactivate.guard';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AppointmentDetails, TimeSlot} from '../../Interfaces/userInterface'
import { UserModel } from '../../Store/User/userModel';
import { AppState } from '../../Store/User/user.state';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../Store/User/user.selector';
import { DateTransformPipe } from '../../../date-transform.pipe';
import * as DoctorActions  from '../../../Doctors/Store/doctor.action'
import { commonResponse, doctorDetails } from '../../../Admin/interfaces/interface';
import { selectDoctor } from '../../../Doctors/Store/doctor.store';
import { FormsModule } from '@angular/forms';
import { UserServicesService } from '../../services/user-services.service';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { ToastrService } from 'ngx-toastr';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [UserSlidebarComponent,NavbarComponent,TimeFormatPipe,CommonModule,DateTransformPipe,FormsModule,CapitalizePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, CanComponentDeactivate {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private userService:UserServicesService,
    private toaster:ToastrService,
    private router:Router
  ){}
  appointmentDetails!:AppointmentDetails;
  user$!: Observable<UserModel | null>;
  Doctor$!: Observable<doctorDetails | null>;
  DoctorId!:string | undefined;
  userId!:string | undefined;
  BookingFee:number=10
  consultaionFee!:number | undefined;
  total:number=0
  selectedPaymentMethod: string | undefined;
  selectedTime!: TimeSlot;
  slotId!:string;
  startTime!:string;
  endTime!:string;
  selectedDay!:string;
  consultationType!:string;
  DoctorfirstName!:string | undefined;
  DoctorLastname!:string | undefined;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    alert($event)
    $event.returnValue = true; 
  }

   canDeactivate(): Observable<boolean> | boolean {

    return confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.');
  }
  ngOnInit(): void {
   
 this.store.dispatch(DoctorActions.loadDoctor())
 this.Doctor$=this.store.pipe(select(selectDoctor))

 this.Doctor$.subscribe((doctor)=>{
   this.consultaionFee=doctor?.professionalDetails.consultationFee
   this.DoctorfirstName=doctor?.personalDetails.firstName
   this.DoctorLastname=doctor?.personalDetails.lastName
   this.DoctorId=doctor?._id
   
   this.calculateTotal()
  

   
 })



    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(userState => {
      if (userState) {
     this.userId=userState._id
      } else {
        console.warn('User data is not available');
      }
    });


      this.route.queryParams.subscribe(params => {
         this.slotId = params['timeId'];
         this.startTime = params['startTime'];
        this.endTime = params['endTime'];
         this.DoctorId=params['DoctorId'];
         this.selectedDay=params['selectedDay']

       

      
      });
    
    



   
  }
  consultationTypeSelection(gatvalue:string){
    this.consultationType=gatvalue

  }
 

  calculateTotal(){
    if(this.consultaionFee){
      this.total= this.BookingFee+this.consultaionFee

    }
   
  }

  proceedToPay() {
    if (this.selectedPaymentMethod ) {
      if( this.consultationType){
        if (this.selectedPaymentMethod === 'wallet') {
          this.createAppointment();
         
        } else if (this.selectedPaymentMethod === 'razorpay') {
         
          this.initiateRazorpayPayment();
         
        }
      }else{
        this.toaster.error('please select a consultation type')
      }

      }
      else {
        this.toaster.error("Select Your Payment Method ")
       
      }
      
  }


  initiateRazorpayPayment() {

    const amountInRupees = this.total * 100;  // Amount should be in paise (INR * 100)
  
   
    this.userService.createOrder(amountInRupees, 'INR').subscribe((order) => {
      const options = {
        key: 'rzp_test_QtvRrAM2pvGQjA',
        amount: order.amount, // Amount from the backend response
        currency: order.currency, // Currency from backend response
        name: 'Doctor Appointment',
        description: 'Consultation Payment',
        order_id: order.id, // Order ID from backend response
        handler: (response: any) => {
          this.verifyPayment(response);
        },
        prefill: {
          name: 'Patient Name',
          email: 'patient@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const razorpay = new Razorpay(options);
      razorpay.open();
    });
  }
  // Verify payment after Razorpay returns success
  verifyPayment(response: any) {
    const verificationPayload = {
      order_id: response.razorpay_order_id,
      payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    };

 

    this.userService.verifyPayment(verificationPayload).subscribe((res: commonResponse) => {
      if (res.success) {
        this.toaster.success(res.message);
        this.createAppointment();
      } else {
        this.toaster.error(res.message);
      }
    });
  }

  createAppointment(){
    alert()
    const appointmentData = {
      patientId:this.userId,
      doctorId: this.DoctorId,
      slotId: this.slotId,
      totalAmount: this.total,
      PaymentMethod:this.selectedPaymentMethod,
      paymentStatus: 'paid', 
      consultationType:this.consultationType,

    };
    this.userService.createAppointment(appointmentData).subscribe({
      next:(res:commonResponse)=>{
       if(res.success){
        this.router.navigate(['/Success'],{
          queryParams:{
            id:this.DoctorId
          }
        })
        this.toaster.success(res.message)
       }else{
        this.toaster.error(res.message)
       }
      }

      
    })
    
  }

 

    


  }
  

  
  

  

