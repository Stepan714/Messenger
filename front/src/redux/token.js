import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {token: ""}
};

const tokenSlice = createSlice({
  name: "currUser",
  initialState,
  reducers: {
    changeToken: (state, action) => {
        state.info = action.payload;
    }
  },
});

export const TokenReducer = tokenSlice.reducer;
export const { changeToken } = tokenSlice.actions;
