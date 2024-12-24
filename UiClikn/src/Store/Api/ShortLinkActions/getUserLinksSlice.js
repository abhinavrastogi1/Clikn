import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoadingBar } from "../../UiActions/LoadingBarSlice";

export const getUserLinkApi = createAsyncThunk(
  "getUserLinkSlice/getUserLinkApi",
  async (_, { dispatch }) => {
    dispatch(setLoadingBar(true));
    try {
      const response = await axios.get("/https://clikn.in/url/getuserLinks");
      dispatch(setLoadingBar(false));
      return response.data.data;
    } catch (error) {
      dispatch(setLoadingBar(false));
      console.error("Something went wrong while fetching data", error);
      throw error;
    }
  }
);
const getUserLinkSlice = createSlice({
  name: "getUserLinkSlice",
  initialState: {
    status: "idle",
    error: null,
    userlinks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLinkApi.fulfilled, (state, action) => {
        state.status = "success";
        state.userlinks = action.payload;
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
