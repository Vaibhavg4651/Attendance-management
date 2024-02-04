// import React from 'react'
// import {createSlice} from '@reduxjs/toolkit'
// const initialState = {
//     isAuthenticated: false,
//     role: 'proctor',
//     // Add other user-related state properties here
//   };
// const userSlice = createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         loginSuccess:(state,action)=>{
//             state.isAuthenticated=true;
//             state.role=action.payload.role;
//         },

//         logout: (state) => {
//             state.isAuthenticated = false;
//             state.role = 'proctor';
//             // Handle other state changes upon logout
//           },
//     }
// })
// export const{loginSuccess,logout}=userSlice.actions;
// export default userSlice.reducer;
