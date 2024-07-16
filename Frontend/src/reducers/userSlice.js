import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userid: null,
    isAuthenticated: false,
    role: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userid = action.payload.id;
      state.role = action.payload.user_type;
      state.email=action.payload.email
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "";
      state.userid = null;
    },
  },
});

export default userSlice.reducer;
export const { loginSuccess ,logout} = userSlice.actions;
