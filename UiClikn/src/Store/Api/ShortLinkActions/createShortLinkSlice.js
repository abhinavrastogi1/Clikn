import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoadingBar } from "../../UiActions/LoadingBarSlice";
import { getUserLinkApi } from "./getUserLinksSlice";
import { setLinkDelete_CreateMsg } from "../../UiActions/LinkDeleteCreateMsg";
const API_URL = import.meta.env.VITE_API_URL;

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
        `${API_URL}/url/generateShortLink`,
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
      dispatch(setLinkDelete_CreateMsg("Your link is ready! 🎉"));
      dispatch(setLoadingBar(false));
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(
          setLinkDelete_CreateMsg(
            "The link is not safe and cannot be shortened⚠️☠️🚨"
          )
        );
      } else {
        dispatch(
          setLinkDelete_CreateMsg(" Failed to create Your link. Try again!")
        );
      }
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
    shortLink: "",
  },
  reducers: {
    setShortLink: (state, action) => {
      state.shortLink = action.payload;
    },
  },
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
export const { setShortLink } = createShortLinkSlice.actions;
export default createShortLinkSlice.reducer;
