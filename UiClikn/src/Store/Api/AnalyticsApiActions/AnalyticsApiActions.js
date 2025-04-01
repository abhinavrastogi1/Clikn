import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL=import.meta.env.VITE_API_URL

import { setLoadingBar } from "../../UiActions/LoadingBarSlice";
export const analyticsApiCall = createAsyncThunk(
  "analyticsSlice/analyticsApiCall",
  async (apiCallData, { dispatch }) => {
    dispatch(setLoadingBar(true));
    try {
      const response = await axios.get(`${API_URL}/link/analytics`, {
        params: apiCallData,
        withCredentials: true,
      });
      dispatch(setLoadingBar(false));
      return response.data.data;
    } catch (error) {
      dispatch(setLoadingBar(false));
      console.error("Error while fetching Analytics", error);
      throw error;
    }
  }
);
const analyticsSlice = createSlice({
  name: "analyticsSlice",
  initialState: {
    analytics: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(analyticsApiCall.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(analyticsApiCall.fulfilled, (state, action) => {
        state.status = "success";
        state.analytics = action.payload[0];
      })
      .addCase(analyticsApiCall.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default analyticsSlice.reducer;

// date:{
//   day:12,
//   year:2024,
//   month:12
// },

// month:{
//   month:11,
//   year:2024
// },
