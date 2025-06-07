import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserLinkApi } from "../ShortLinkActions/getUserLinksSlice";
import { setLoadingBar } from "../../UiActions/LoadingBarSlice";
import { setLinkDelete_CreateMsg } from "../../UiActions/LinkDeleteCreateMsg";
const API_URL=import.meta.env.VITE_API_URL

export const deleteLinkCall = createAsyncThunk(
  "deleteLinkSlice/deleteLinkCall",
  async (_id, { dispatch }) => {
    dispatch(setLoadingBar(true));
    try {
      const response = await axios.delete(`${API_URL}/url/deleteLink`, {
        params: {
          _id: _id,
        },
        withCredentials: true,

      });
      dispatch(setLoadingBar(false));
      dispatch(getUserLinkApi());
      dispatch(setLinkDelete_CreateMsg("Your link is deleted!"));
    } catch (error) {
      dispatch(setLoadingBar(false));
      dispatch(
        setLinkDelete_CreateMsg(" Failed to delete Your link. Try again!")
      );
      console.error("Something went wrong while deleting link ");
      throw error;
    }
  }
);
const deleteLinkSlice = createSlice({
  name: "deleteLinkSlice",
  initialState: { status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteLinkCall.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteLinkCall.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteLinkCall.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
export default deleteLinkSlice.reducer;
