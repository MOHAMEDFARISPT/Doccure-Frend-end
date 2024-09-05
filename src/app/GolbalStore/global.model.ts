import { generalDetails } from "../Admin/interfaces/interface";

// user.model.ts
export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date | undefined |null|''
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
  export interface personalDetails {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    contactNumber: string;
    dateofBirth: Date;
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
  
  export interface professionalDetails {
    medicalLicenceNumber: string;
    specialisedDepartment: string;
    totalExperience: number;
    patientsPerDay: number;
    consultationFee: number;
  }
  
  export interface Doctor {
    _id: string;
    personalDetails: personalDetails;
    generalDetails: generalDetails;
    professionalDetails: professionalDetails;
    createdAt: Date;
    updatedAt: Date;
  }
  