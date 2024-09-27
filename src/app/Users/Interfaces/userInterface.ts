

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    dateOfBirth: Date; 
    contactNumber:string;
    accessToken:string;
  
  
  }

  export interface getUsersDataResponse{


  }

  export interface TimeSlot {
    _id: string;
    DoctorId?: string;
    startTime: string;
    endTime: string;
    isBooked?:boolean;
  }
  
  export interface proccedTopay {
    day?: string;
    times: TimeSlot;
  }

  

export interface UserLoginData{
    email:string;
    password:string;
  
  }


  export interface loginResponse {
    success: boolean;
    message:string;
    accessToken?: string;
    data:UserData;
  }


  
  export interface AppointmentDetails {
    day: string;
    time: TimeSlot;
    doctor:string;
    
  }
  

  interface Transaction {
    transactionId: string;
    amount: number;
    type: 'Debit' | 'Credit';
    description?: string;
  }
  
  // Interface for the Wallet model
  export interface IWallet {
    _id:string;        
    userId:string;        
    balance: number;              
    transactions: Transaction[];   
    createdAt?: Date;              
    updatedAt?: Date;             
  }




  export interface personalDetails {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    contactNumber: string;
    dateofBirth: Date;
    password?: string;
    profileImage?: string;
    isApproved?: boolean;
    isBlocked?: boolean;
    role?: string;
  }
  
  export interface generalDetails {
    city: string;
    state: string;
    country: string;
    zipcode: string;
    adharNumber: string;
  }
  
  export interface professionalDetails {
    medicalLicenceNumber: string;
    specialisedDepartment: string;
    bio:string;
    totalExperience: number;
    patientsPerDay: number;
    consultationFee: number;
  }

  export interface Doctor {
    _id:string;
    personalDetails: personalDetails;
    generalDetails: generalDetails;
    professionalDetails: professionalDetails;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  
  
  export interface Slot {
    _id: string;
    day: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    doctorId: string;
    __v: number;
  }

  export interface Appointment {
    _id: string;
    patientId: UserData;  
    doctorId: Doctor;
    slotId: Slot;
    totalAmount: number;
    PaymentMethod: string;
    paymentStatus: string;
    consultationType: string;
    consultaionStatus: string;
    isCancelled: boolean;
    cancellationReason?: string;
    __v: number;
  }


 




