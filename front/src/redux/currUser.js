import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {id: 1}
};

const currUserSlice = createSlice({
  name: "currUser",
  initialState,
  reducers: {
    changeUser: (state, action) => {
        state.info = action.payload;
    },
    updateUser: (state, action) => {
        state.info = {
            ...state.info,
            ...action.payload
        }
    }
  },
});

export const currUserReducer = currUserSlice.reducer;
export const { changeUser, updateUser } = currUserSlice.actions;
