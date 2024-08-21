// import { createReducer, on } from '@ngrx/store';
// // import * as AuthActions from './user.actions'
// import { initialState, userstate } from './app.state';

// export const authReducer = createReducer(
//     initialState,
//     on(AuthActions.registerUser, (state): userstate => ({
//       ...state,
//       isLoading: true,  
//       error: null,
//     })),
//     on(AuthActions.registerUserSuccess, (state, { user }): userstate => ({
//       ...state,
//       isLoading: false, 
//       user,    
//       error: null,
//     })),
//     on(AuthActions.registerUserFailure, (state, { error }): userstate => ({
//       ...state,
//       isLoading: false,
//       error,          
//     }))
//   );