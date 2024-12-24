import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoadingBar } from "../../UiActions/LoadingBarSlice";
import { getUserLinkApi } from "./getUserLinksSlice";

export const createShortLinkApi = createAsyncThunk(
  "createShortLinkSlice/createShortLinkApi",
  async (urlData, { dispatch }) => {
    let originalLink = "";
    let title = null;
    if (urlData) {
      (originalLink = urlData?.originalLink), (title = urlData?.title);
    }
    try {
      dispatch(setLoadingBar(true));
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
      dispatch(getUserLinkApi());
      dispatch(setLoadingBar(false));
      return response.data.data;
    } catch (error) {
      console.error("Failed to create the link. Please try again", error);
      dispatch(setLoadingBar(false));
      throw error;
    }
  }
);
const createShortLinkSlice = createSlice({
  name: "createShortLinkSlice",
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
export default createShortLinkSlice.reducer;
