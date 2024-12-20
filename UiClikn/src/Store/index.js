import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./UiActions/loginSlice.js";
import loginApiSlice from "./Api/LoginApiActions/loginApiSlice.js"
import  createShortLinkSlice  from "./Api/ShortLinkActions/createShortLinkSlice.js";
import loadingBarSlice from "./UiActions/LoadingBarSlice.js"
import getUserLinkSlice from "./Api/ShortLinkActions/getUserLinksSlice.js"
const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    loginApiSlice:loginApiSlice,
    createShortLinkSlice:createShortLinkSlice,
    getUserLinkSlice:getUserLinkSlice,
    loadingBarSlice:loadingBarSlice
  },
});

export default store;
