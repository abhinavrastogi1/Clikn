import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./UiActions/loginSlice.js";
import loginApiSlice from "./Api/LoginApiActions/loginApiSlice.js"
import  createShortLink  from "./Api/ShortLinkActions/createShortLinkSlice.js";
const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    loginApiSlice:loginApiSlice,
    createShortLink:createShortLink
  },
});

export default store;
