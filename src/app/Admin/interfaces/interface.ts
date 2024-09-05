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
