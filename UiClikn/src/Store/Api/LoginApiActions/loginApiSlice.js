import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loggedInReducer, setLoginMsg } from "../../UiActions/loginSlice.js";
import axios from "axios";
const API_URL=import.meta.env.VITE_API_URL

import { setLoadingBar } from "../../UiActions/LoadingBarSlice.js";
export const verifyLogin = createAsyncThunk(
  "loginApiSlice/verifyLogin",
  async (_, { dispatch }) => {
    dispatch(setLoadingBar(true));
    try {
      const response = await axios.get(
        `${API_URL}/user/userVerification`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      dispatch(setLoadingBar(false));
      return response.data.data;
    } catch (error) {
      dispatch(loggedInReducer(false));
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
      const response = await axios.post(
        `${API_URL}/user/login`,
        loginForm,{withCredentials:true}
      );
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      return response.data.data;
    } catch (error) {
      if (error.status === 409) {
        dispatch(
          setLoginMsg(
            "This email is linked to a Google account. Please use Log in with Google to access your account."
          )
        );
      } else if (error.status === 401) {
        dispatch(setLoginMsg("Invalid password!"));
      } else if (
        error.status === 400 &&
        error.response.data.message === "User not registred"
      ) {
        dispatch(setLoginMsg("sign up to create a new account"));
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
      const response = await axios.post(
        `${API_URL}/user/registration`,
        signUpFrom, { withCredentials: true } 
      );
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      return response.data.data;
    } catch (error) {
      if (
        error.status === 409 &&
        error.response.data.message === "Email is already in use.login via form"
      ) {
        dispatch(setLoginMsg("Email is already in use.login via form"));
      } else if (
        error.status === 409 &&
        error.response.data.message ===
          "Email is already in use.login via google"
      ) {
        dispatch(setLoginMsg("Email is already in use.login via google"));
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
