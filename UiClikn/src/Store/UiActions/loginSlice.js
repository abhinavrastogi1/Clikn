import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    loginPage: true,
    loggedIn: false,
    loginMsg: "",
  },
  reducers: {
    loginPageReducer: (state, action) => {
      state.loginPage = action.payload;
    },
    loggedInReducer: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLoginMsg: (state, action) => {
      state.loginMsg = action.payload;
    },
  },
});
export const { loginPageReducer, loggedInReducer,setLoginMsg } = loginSlice.actions;
export default loginSlice.reducer;
