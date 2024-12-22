import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const analyticsApiCall = createAsyncThunk(
  "analyticsSlice/analyticsApiCall",
  async () => {
    try {
      const response = await axios.get("/user/analytics", {
        params: {
          year:2024,
          shortId: "UnxxPDD",
        },
      });
      return response.data.data;
    } catch (error) {
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
