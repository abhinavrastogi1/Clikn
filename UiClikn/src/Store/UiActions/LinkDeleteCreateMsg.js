import { createSlice } from "@reduxjs/toolkit";

const   linkDelete_CreateMsgSlice = createSlice({
  name: "      linkDelete_CreateMsgSlice",
  initialState: {
    linkDelete_CreateMsg:""
  },
  reducers: {
    setLinkDelete_CreateMsg: (state, action) => {
      state.linkDelete_CreateMsg = action.payload;
    },
  },
});
export const { setLinkDelete_CreateMsg } =     linkDelete_CreateMsgSlice.actions;
export default  linkDelete_CreateMsgSlice.reducer;
