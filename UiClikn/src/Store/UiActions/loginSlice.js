import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    loginPage: true,
    loggedIn: false,
  },
  reducers: {
    loginPageReducer: (state, action) => {
      state.loginPage = action.payload;
    },
    loggedInReducer: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});
export const { loginPageReducer, loggedInReducer } = loginSlice.actions;
export default loginSlice.reducer;
