export interface personalDetails {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  contactNumber: string;
  dateofBirth?: string;
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

export interface doctorDetails {
  _id: string;
  personalDetails: personalDetails;
  generalDetails: generalDetails;
  professionalDetails: professionalDetails;
}



export interface Slot {
  startTime: string;
  endTime: string;
  day: string;
  doctorId?: string; 
}





export interface commonResponse{
  success?:true;
  message?:string;

}

export interface slots {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked:boolean
}

export interface AvailableTimeResponse {
  slots: slots[]; 
  success?: boolean;
  message?: string;
  doctorId?: string;
}


