import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./UiActions/loginSlice.js";
import LoginApiSlice from "./Api/LoginApiActions/loginApiSlice.js"
const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    LoginApiSlice:LoginApiSlice
  },
});

export default store;
