// user.model.ts
export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
    contactNumber?: string;
    email?: string;
    password?: string;
    isOtpVerified?: boolean;
    isBlocked?: boolean;
    role?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  // doctor.model.ts
  export interface PersonalDetails {
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    contactNumber: string;
    dateOfBirth: Date;
    password: string;
    role: string;
    isApproved: boolean;
    profileImage: string;
    isBlocked: boolean;
  }
  
  export interface GeneralDetails {
    city: string;
    state: string;
    country: string;
    zipcode: string;
    adharNumber: string;
  }
  
  export interface ProfessionalDetails {
    medicalLicenceNumber: string;
    specialisedDepartment: string;
    totalExperience: number;
    patientsPerDay: number;
    consultationFee: number;
  }
  
  export interface Doctor {
    _id: string;
    personalDetails: PersonalDetails;
    generalDetails: GeneralDetails;
    professionalDetails: ProfessionalDetails;
    createdAt: Date;
    updatedAt: Date;
  }
  