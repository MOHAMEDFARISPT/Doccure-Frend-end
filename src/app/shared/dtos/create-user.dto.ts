export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string; 
  contactNumber:string;
}
