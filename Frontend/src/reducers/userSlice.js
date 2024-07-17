import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userid: null,
    isAuthenticated: false,
    role: null,
    BranchId:null,
    SemesterNumber:null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userid = action.payload.id;
      state.role = action.payload.user_type;
      state.email=action.payload.email
    },
    setBranchId(state, action) {
      state.BranchId = action.payload.BranchID;
      state.SemesterNumber = action.payload.SemesterNumber;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "";
      state.userid = null;
      state.BranchId=null;
    },
  },
});

export default userSlice.reducer;
export const { loginSuccess ,logout , setBranchId, setSemesterNumber} = userSlice.actions;
