import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import messageReducer from "../features/messageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});
