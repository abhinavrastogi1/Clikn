import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loggedInReducer } from "../../UiActions/loginSlice.js";
import axios from "axios";
export const verifyLogin = createAsyncThunk(
  "LoginApiSlice/verifyLogin",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("/user/userVerification", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      return response.data.data;
    } catch (error) {
      console.error("User not verified", error);
      throw error;
    }
  }
);
const LoginApiSlice = createSlice({
  name: "LoginApiSlice",
  initialState: {
    formUrl: "",
    showLandingPage: false,
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {
    addUrl: (state, action) => {
      state.formUrl = action.payload;
    },
    setLandingPage: (state, action) => {
      state.showLandingPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(verifyLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.showLandingPage = true;
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
export const { addUrl, setLandingPage } = LoginApiSlice.actions;
export default LoginApiSlice.reducer;
