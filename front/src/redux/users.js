import { createSlice } from "@reduxjs/toolkit";
import { schema, normalize } from "normalizr";

let userSchema;

userSchema = new schema.Entity("users");

const initialState = {
  usersList: [],
  usersDict: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const normalizedData = normalize(action.payload.get, [userSchema]);
      state.usersList = Object.keys(normalizedData.entities.users);
      state.usersDict = normalizedData.entities.users;
    },
    updateUser: (state, action) => {
      state.usersDict[action.payload.id] = action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { setUsers, updateUser } = usersSlice.actions;
