import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./UiActions/loginSlice.js";
import loginApiSlice from "./Api/LoginApiActions/loginApiSlice.js"
import  createShortLinkSlice  from "./Api/ShortLinkActions/createShortLinkSlice.js";
import loadingBarSlice from "./UiActions/LoadingBarSlice.js"
import getUserLinkSlice from "./Api/ShortLinkActions/getUserLinksSlice.js"
import analyticsSlice from "./Api/AnalyticsApiActions/AnalyticsApiActions.js"
import deleteLinkSlice from "./Api/DeleteAPiActions/deleteLinkSlice.js"
import logoutSlice from "./Api/LogoutApiActions/logoutSlice.js"
import   linkDelete_CreateMsgSlice from "./UiActions/LinkDeleteCreateMsg.js"
const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    loginApiSlice:loginApiSlice,
    createShortLinkSlice:createShortLinkSlice,
    getUserLinkSlice:getUserLinkSlice,
    loadingBarSlice:loadingBarSlice,
    analyticsSlice:analyticsSlice,
    deleteLinkSlice:deleteLinkSlice,
    logoutSlice:logoutSlice,
    linkDelete_CreateMsgSlice:linkDelete_CreateMsgSlice

  },
});

export default store;
