import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setChats: _setChats } = chatsSlice.actions;

export const selectAllChats = (state) => state.chat.chats;
export default chatsSlice.reducer;
