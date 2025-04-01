import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoadingBar } from "../../UiActions/LoadingBarSlice";
const API_URL=import.meta.env.VITE_API_URL
console.log()
export const getUserLinkApi = createAsyncThunk(
  "getUserLinkSlice/getUserLinkApi",
  async (_, { dispatch }) => {
    dispatch(setLoadingBar(true));
    try {
      const response = await axios.get(
       `${API_URL}/url/getuserLinks`,
        {
          withCredentials: true,
        }
      );
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
