// userModel.ts
export type UserModel = {
    _id?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
    contactNumber?:string,
    email?: string;
    password?: string;
    profileImage?: string;
    isAdmin?: boolean;
    isBlocked?: boolean;
    phoneNumber?: number;
    accessToken?:string
  };


  export interface user{
    user:UserModel
  }
  