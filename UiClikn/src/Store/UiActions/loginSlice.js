import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    loginPage: true,
    loggedIn: false,
  },
  reducers: {
    loginPage: (state, action) => {
      state.loginPage = action.payload;
    },
    loggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});
export const { loginPage, loggedIn } = loginSlice.actions;
export default loginSlice.reducer;
