import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  auth,
  createUserWithEmailAndPassword,
  db,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (loginInfo) => {
    const { email: _email, password: _password } = loginInfo;
    const userAuth = await signInWithEmailAndPassword(auth, _email, _password);
    const { email, displayName, photoURL, uid } = userAuth.user;
    return { email, displayName, photoURL, uid };
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (newUserInfo) => {
    const { newUserName, newProfilePic } = newUserInfo;
    try {
      await updateProfile(auth.currentUser, {
        displayName: newUserName,
        photoURL: newProfilePic,
      });
      const { email, displayName, photoURL, uid } = auth.currentUser;
      return { email, displayName, photoURL, uid };
    } catch (err) {
      console.log("err: ", err);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userInfo) => {
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      try {
        await updateProfile(userAuth.user, {
          displayName: userInfo.userName,
          photoURL: userInfo.photoURL,
        });
        await setDoc(doc(db, "users", userAuth.user.uid), {
          uid: userAuth.user.uid,
          displayName: userInfo.userName,
          email: userInfo.email,
          photoURL: userInfo.photoURL,
        });
      } catch (err) {
        console.log(err);
      }

      await setDoc(doc(db, "userChats", userAuth.user.uid), {});
      const { email, displayName, photoURL, uid } = userAuth.user;
      return { email, displayName, photoURL, uid };
    } catch (error) {
      console.log(error);
    }
  }
);

export const logOutUser = createAsyncThunk("user/logOutUser", async () => {
  await signOut(auth);
});

const initialState = {
  user: {},
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logInUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signUpUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      });
  },
});

export const { login, logout, setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
