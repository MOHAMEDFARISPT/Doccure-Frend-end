import { Doctor, User } from "./global.model";
import {Appointment} from '../Users/Interfaces/userInterface'


export interface globalState {
     users: User[];
     doctors: Doctor[];
     Appointments:Appointment[],
    loading: boolean;
    error: string | null;
  }
  
  export const initialState: globalState = {
    users: [],
    doctors: [],
    Appointments:[],
    loading: false,
    error: null,
  };






