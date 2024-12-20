import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserLinkApi = createAsyncThunk(
  "createShortLink/getUserLinkApi",
  async (page) => {
    try {
      const response = await axios.get("/user/url/getuserLinks", {
        params: {
          page: 0,
        },
      });
      console.log(response.data.data);
    } catch (error) {
      console.error("Something went wrong while fetching data", error);
      throw error
    }
  }
);
const getUserLinkSlice = createSlice({
  name: "getUserLinkSlice",
  initialState: {
    status: "idle",
    error: null,
    linkData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLinkApi.fulfilled, (state, action) => {
        state.status = "success";
        state.linkData = action.payload;
      })
      .addCase(getUserLinkApi.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserLinkApi.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
export default getUserLinkSlice.reducer;
