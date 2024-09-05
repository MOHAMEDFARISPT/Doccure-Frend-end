
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

  

export interface UserLoginData{
    email:string;
    password:string;
  
  }


  export interface loginResponse {
    success: boolean;
    message:string;
    accessToken: string;
    data:UserData;
  }




