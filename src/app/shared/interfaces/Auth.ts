import { UserModel } from "../../Users/Store/User/userModel";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date; 
  contactNumber:string;


}





export interface UserLoginData{
  email:string;
  password:string;

}








export interface loginResponse {
  success: boolean;
  message:string;
  Token: string;
  data:UserData;
}


export interface DoctorRegData{
  firstName:string;
  lastname:string;
  email:string;
  gender:string;
  dateofBirth:string;
  contactNumber:string;
  password:string;

}







