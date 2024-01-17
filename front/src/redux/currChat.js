import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesList: [],
  messagesDict: {},
};

const currChatSlice = createSlice({
  name: "currChat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
        const { data, messageIds } = action.payload;
        state.messagesList = messageIds;
        state.messagesDict = data.reduce((dict, message) => {
          dict[message.id] = message;
          return dict;
        }, {});
    }
  },
});

export const currChatReducer = currChatSlice.reducer;
export const { setMessages, addMessage, updateMessage } = currChatSlice.actions;
