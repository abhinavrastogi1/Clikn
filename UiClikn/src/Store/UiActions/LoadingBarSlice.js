import { createSlice } from "@reduxjs/toolkit";

const loadingBarSlice = createSlice({
  name: "loadingBarSlice",
  initialState: {
    loading:false
  },
  reducers: {
    setLoadingBar: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setLoadingBar } = loadingBarSlice.actions;
export default loadingBarSlice.reducer;
