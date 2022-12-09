import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import ChatsList from "../../Chats/ChatsList/ChatsList";
import Input from "../../Ui/Input/Input";
import Avatar from "../../Ui/Avatar/Avatar";
import Button from "../../Ui/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { logOutUser, selectUser } from "../../../features/userSlice";
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

import { db } from "../../../firebase";
import { fetchChat } from "../../../features/chatSlice";
import ChatItem from "../../Chats/ChatItem/ChatItem";

import classes from "./Sidebar.module.css";

function Sidebar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useSelector(selectUser);

  const handleSearchUser = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", input));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleSelectChat = () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    dispatch(fetchChat({ usersCombinedId: combinedId, currentUser, user }));
    setInput("");
    setUser(null);
  };

  const logOutHandler = () => {
    dispatch(logOutUser());
  };

  return (
    <aside className={classes.sidebar}>
      <header className={classes.header}>
        <Input
          placeHolder="Find a User to Chat."
          onChangeHandler={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button onClick={handleSearchUser}>Find</Button>
      </header>
      {user && (
        <div className={classes.foundedChat} onClick={handleSelectChat}>
          <ChatItem userInfo={user} />
        </div>
      )}
      <ChatsList />
      <footer className={classes["sidebar-footer"]}>
        <Button onClick={logOutHandler}>
          <BiLogOut />
        </Button>
        <div className={classes["sidebar-user"]}>
          <Avatar src={currentUser.photoURL} />
          <p className={classes["sidebar-user-name"]}>
            {currentUser.displayName}
          </p>
        </div>
      </footer>
    </aside>
  );
}

export default Sidebar;
