// models/doctor-details.model.ts
export interface PersonalDetails {
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    contactNumber: string;
    dateOfBirth: Date;
    password: string;
    profileImage: string;
    isApproved: boolean;
    isBlocked: boolean;
    role: string;
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
  
  export interface DoctorDetails {
    _id: string;
    personalDetails: PersonalDetails;
    generalDetails: GeneralDetails;
    professionalDetails: ProfessionalDetails;
  }
  
  export interface DoctorResponseDto {
    success: boolean;
    message: string;
    data: DoctorDetails[];  // Ensure this matches your backend response structure
  }
  