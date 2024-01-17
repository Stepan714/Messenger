import { configureStore } from "@reduxjs/toolkit";
import { currUserReducer } from "./redux/currUser";
import { usersReducer } from "./redux/users";
import { chatsReducer } from "./redux/chats";
import { currChatReducer } from "./redux/currChat";
import { TokenReducer } from "./redux/token";


export const store = configureStore({
  reducer: {
    currChat: currChatReducer,
    currUser: currUserReducer,
    users: usersReducer,
    chats: chatsReducer,
    token: TokenReducer,
  },
  devTools: true,
});