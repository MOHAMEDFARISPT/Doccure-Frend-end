export interface personalDetails {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    contactNumber: string;
    dateofBirth: Date;
    password: string;
    confirmPassword: string;
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
    specialisedDepartment:string;
    totalExperience: number;
    patientsPerDay: number;
    consultationFee: number;
  }
  

 

  export interface doctorRegistration {
    personalDetails: personalDetails;
    generalDetails: generalDetails;
    professionalDetails: professionalDetails;
  }



  export interface doctorResponse{
    success:boolean,
    message:string,
    data:{
      _id:string,
      personalDetailes:personalDetails,
      generalDetailes:generalDetails,
      proffessionalDetailes:professionalDetails
    }
  }

  export interface doctorLogin{
    email:string;
    password:string;
  }
  

  export interface loginDoctorResponse {
      success:boolean,
      message:string,
      data:{
        _id:string,
        personalDetailes:personalDetails,
        generalDetailes:generalDetails,
        proffessionalDetailes:professionalDetails
      },
      token:string


  }
  
  