import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loggedInReducer } from "../../UiActions/loginSlice.js";
import axios from "axios";
import { createShortLinkApi } from "../ShortLinkActions/createShortLinkSlice.js";
import { setLoadingBar } from "../../UiActions/LoadingBarSlice.js";
export const verifyLogin = createAsyncThunk(
  "loginApiSlice/verifyLogin",
  async (_, { dispatch }) => {
    dispatch(setLoadingBar(true));
    try {
      const response = await axios.get("/user/userVerification", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      dispatch(setLoadingBar(false));
      return response.data.data;
    } catch (error) {
      console.error("User not verified", error);
      dispatch(setLoadingBar(false));
      throw error;
    }
  }
);
export const loginViaForm = createAsyncThunk(
  "loginApiSlice/loginViaForm",
  async (loginForm, { dispatch }) => {
    try {
      const response = await axios.post("/user/login", loginForm);
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      return response.data.data;
    } catch (error) {
      if (response.status === 409) {
      } else if (response.status === 401) {
      }
      console.error("Login failed", error);
      throw error;
    }
  }
);
export const signUpViaForm = createAsyncThunk(
  "loginApiSlice/signUpViaForm",
  async (signUpFrom, { dispatch }) => {
    try {
      const response = await axios.post("/user/registration", signUpFrom);
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      return response.data.data;
    } catch (error) {
      if (response.status === 409) {
      }
      console.error("Signup failed", error);
      throw error;
    }
  }
);
const loginApiSlice = createSlice({
  name: "loginApiSlice",
  initialState: {
    formUrl: "",
    showLandingPage: false,
    user: {},
    status: "idle",
    error: null,
    loadingLogin: false,
  },
  reducers: {
    addUrl: (state, action) => {
      state.formUrl = action.payload;
    },
    setLandingPage: (state, action) => {
      state.showLandingPage = action.payload;
    },
    setLoadingLogin: (state, action) => {
      state.loadingLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.loadingLogin = false;
      })
      .addCase(verifyLogin.pending, (state) => {
        state.status = "pending";
        state.loadingLogin = true;
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.showLandingPage = true;
        state.status = "error";
        state.error = action.error.message;
        state.loadingLogin = false;
      })
      .addCase(loginViaForm.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.loadingLogin = false;
      })
      .addCase(loginViaForm.pending, (state) => {
        state.status = "pending";
        state.loadingLogin = true;
      })
      .addCase(loginViaForm.rejected, (state, action) => {
        state.showLandingPage = true;
        state.status = "error";
        state.error = action.error.message;
        state.loadingLogin = false;
      })
      .addCase(signUpViaForm.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.loadingLogin = false;
      })
      .addCase(signUpViaForm.pending, (state) => {
        state.status = "pending";
        state.loadingLogin = true;
      })
      .addCase(signUpViaForm.rejected, (state, action) => {
        state.showLandingPage = true;
        state.status = "error";
        state.error = action.error.message;
        state.loadingLogin = false;
      });
  },
});
export const { addUrl, setLandingPage, setLoadingLogin } =
  loginApiSlice.actions;
export default loginApiSlice.reducer;