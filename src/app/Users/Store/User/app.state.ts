
export interface userstate {
    user: any; 
    users: any[];
    isLoading: boolean; 
    error: string | null; 
    token:string | null
  }
 
  export const initialState: userstate = {
    user: null, 
    users: [], 
    isLoading: false,
    error: null, 
   token:  null
  };
  