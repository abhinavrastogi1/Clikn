import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loggedInReducer } from "../../UiActions/loginSlice.js";
import axios from "axios";
export const verifyLogin = createAsyncThunk(
  "LoginApiSlice/verifyLogin",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("/user/userVerification");
      if (response.status === 200) {
        dispatch(loggedInReducer(true));
      }
      return response.data.data;
    } catch (error) {
      console.error("User not verified", error);
    }
  }
);
const LoginApiSlice = createSlice({
  name: "LoginApiSlice",
  initialState: {
    url: "",
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {
    addUrl: (state, action) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
      })
      .addCase(verifyLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
export const { addUrl } = LoginApiSlice.actions;
export default LoginApiSlice.reducer;
