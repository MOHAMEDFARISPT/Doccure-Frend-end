import { Doctor, User } from "./global.model";


export interface globalState {
     users: User[];
     doctors: Doctor[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialState: globalState = {
    users: [],
    doctors: [],
    loading: false,
    error: null,
  };






