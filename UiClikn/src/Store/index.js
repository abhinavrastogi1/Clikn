import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./UiActions/loginSlice.js";
const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    
  },
});

export default store;
