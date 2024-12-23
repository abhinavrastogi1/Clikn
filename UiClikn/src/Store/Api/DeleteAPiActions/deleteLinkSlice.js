import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserLinkApi } from "../ShortLinkActions/getUserLinksSlice";
export const deleteLinkCall = createAsyncThunk(
  "deleteLinkSlice/deleteLinkCall",
  async (_id, { dispatch }) => {
    try {
      const response = await axios.get("/user/url/deleteLink", {
        params: {
          _id: _id,
        },
      });
      dispatch(getUserLinkApi());
    } catch (error) {
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
