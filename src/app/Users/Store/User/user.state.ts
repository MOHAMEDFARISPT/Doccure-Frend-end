import { UserModel } from "./userModel";

export interface AppState {
  
  user: UserModel | null;
  users: UserModel[];
  loading: boolean;
  error: any | null;
}

export const initialState: AppState = {
  user: null,
  users: [],
  loading: false,
  error: null,

};

