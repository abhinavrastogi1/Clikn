import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";

export const createShortLinkApi = createAsyncThunk(
  "createShortLink/createShortLinkApi",
  async (urlData, { getState }) => {
    let originalLink = "";
    let title = null;
    if (urlData) {
      (originalLink = urlData.originalLink), (title = urlData?.title);
    }
    try {
      const response = await axios.post(
        "/user/url/generateShortLink",
        {},
        {
          params: {
            originalLink: originalLink,
            title: title,
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to create the link. Please try again", error);
    }
  }
);
const createShortLink = createSlice({
  name: "createShortLink",
  initialState: {
    status: "idle",
    error: null,
    linkData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShortLinkApi.fulfilled, (state, action) => {
        state.status = "success";
        state.linkData = action.payload;
      })
      .addCase(createShortLinkApi.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createShortLinkApi.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
export default createShortLink.reducer;
