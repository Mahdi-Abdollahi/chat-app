import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (messageInfo) => {
    const { text, senderId, receiverId, chatId } = messageInfo;
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, "userChats", senderId), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", receiverId), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
    return {
      text,
      senderId,
      date: Timestamp.now(),
    };
  }
);

const initialState = {
  message: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState,

  //   extraReducers(builder) {
  //     builder.addCase(sendMessage.fulfilled, (state, action) => {
  //         console.log(message)
  //       state.message = action.payload;
  //     });
  //   },
});

export default messageSlice.reducer;
