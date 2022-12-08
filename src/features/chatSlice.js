import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  createUserWithEmailAndPassword,
  db,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "../firebase";

export const fetchChat = createAsyncThunk(
  "chat/fetchCaht",
  async (chatInfo) => {
    const { usersCombinedId, currentUser, user } = chatInfo;
    console.log("currentUser: ", currentUser);
    console.log("user: ", user);
    console.log("usersCombinedId: ", usersCombinedId);
    try {
      const res = await getDoc(doc(db, "chats", usersCombinedId));
      console.log(res);
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", usersCombinedId), { messages: [] });

        //create user chats
        try {
          console.log(currentUser.uid);
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [usersCombinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [usersCombinedId + ".date"]: serverTimestamp(),
          });
        } catch (err) {
          console.log("err: ", err);
        }
        try {
          await updateDoc(doc(db, "userChats", user.uid), {
            [usersCombinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [usersCombinedId + ".date"]: serverTimestamp(),
          });
        } catch (error) {}
      }
    } catch (err) {}
    return { chatId: usersCombinedId, user };
  }
);

const initialState = {
  chatId: null,
  user: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.user = action.payload.user;
      state.chatId = action.payload.chatId;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.chatId = action.payload.chatId;
      state.user = action.payload.user;
    });
  },
});

export const { setChat } = chatSlice.actions;

export const selectChat = (state) => state.chat;
export const selectChatId = (state) => state.chat.chatId;
export const selectUserChatWithin = (state) => state.chat.user;
export default chatSlice.reducer;
