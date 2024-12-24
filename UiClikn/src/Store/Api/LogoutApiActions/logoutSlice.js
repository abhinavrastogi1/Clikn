import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { verifyLogin } from "../LoginApiActions/loginApiSlice";
import { loggedInReducer } from "../../UiActions/loginSlice";
export const logoutApiCall = createAsyncThunk(
  "logoutSlice/logoutApiCall",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("https://www.clikn.in/user/logout");
      dispatch(verifyLogin());
      dispatch(loggedInReducer(false));
    } catch (error) {
      console.error("Something went wrong while logging out ");
      throw error;
    }
  }
);

const logoutSlice = createSlice({
  name: "logoutSlice",
  initialState: { status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutApiCall.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(logoutApiCall.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logoutApiCall.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
