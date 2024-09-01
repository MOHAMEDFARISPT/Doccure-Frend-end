export interface PersonalDetailsDto {
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    contactNumber: string;
    dateOfBirth: Date;
    password: string;
    confirmPassword: string;
  }


  export interface GeneralDetailsDto {
    city: string;
    state: string;
    country: string;
    zipcode: string;
    adharNumber: string;
  }
  

  export interface ProfessionalDetailsDto {
    medicalLicenceNumber: string;
    specialisedDepartment:string;
    totalExperience: number;
    patientsPerDay: number;
    consultationFee: number;
  }
  

 

  export interface DoctorRegistrationDto {
    personalDetails: PersonalDetailsDto;
    generalDetails: GeneralDetailsDto;
    professionalDetails: ProfessionalDetailsDto;
  }
  
  
  