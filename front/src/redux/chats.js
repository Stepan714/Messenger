import { createSlice } from "@reduxjs/toolkit";
import {schema, normalize} from "normalizr"

const chatsSchema = new schema.Entity("chats");

const initialState = {
  chatsList: [],
  chatsDict: {}
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
        const { result, entities } = state.chatsList = normalize(action.payload, [chatsSchema]);
        state.chatsList = result;
        state.chatsDict = entities.chats;
    },
    addMessage: (state, action) => {
        state.chatsDict[action.payload.id].history.push(action.payload.data)
        
    },
    addChat: (state, action) => {
        state.chatsDict[action.payload.id] = action.payload
        state.chatsList.push(action.payload.id)
    }
  },
});

export const chatsReducer = chatsSlice.reducer;
export const { setChats, addMessage, addChat } = chatsSlice.actions;
