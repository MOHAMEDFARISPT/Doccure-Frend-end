import { Doctor } from "../../GolbalStore/global.model";

export interface AuthState {
    Doctor: any  
    error: any; 
    loading: boolean;
  }
  
  export const initialState: AuthState = {
    Doctor: null,
    error: null,
    loading: false,
  };
  