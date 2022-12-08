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

import classes from "./Sidebar.module.css";
import { db } from "../../../firebase";

function Sidebar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useSelector(selectUser);

  const handleSearchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchedUser)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchedUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelectChat = () => {
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;
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
