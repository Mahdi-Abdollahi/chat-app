import React, { useCallback, useState } from "react";

import ChatsList from "../../Chats/ChatsList/ChatsList";
import SidebarFooter from "../SidebarFooter/SidebarFooter";

import { useDispatch, useSelector } from "react-redux";
import { logOutUser, selectUser } from "../../../features/userSlice";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../../firebase";
import { fetchChat } from "../../../features/chatSlice";
import ChatItem from "../../Chats/ChatItem/ChatItem";
import { useNavigate } from "react-router-dom";

import classes from "./Sidebar.module.css";
import SidebarHeader from "../SidebarHeader/SidebarHeader";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const logOutHandler = useCallback(() => {
    dispatch(logOutUser());
  }, [dispatch]);

  const editProfileHandler = useCallback(() => {
    navigate("/profile");
  }, [navigate]);
  console.log("SIDEBAR");

  const inputChangeHandler = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  return (
    <aside className={classes.sidebar}>
      <SidebarHeader
        inputValue={input}
        onChangeHandler={inputChangeHandler}
        onSearchUserHandler={handleSearchUser}
      />
      {err && (
        <div className={classes.foundedChat} onClick={handleSelectChat}>
          Oops...User Not Found!
        </div>
      )}
      {user && (
        <div className={classes.foundedChat} onClick={handleSelectChat}>
          <ChatItem userInfo={user} />
        </div>
      )}
      <ChatsList />
      <SidebarFooter
        handleEditProfile={editProfileHandler}
        currentUser={currentUser}
        handleLogOut={logOutHandler}
      />
    </aside>
  );
}

export default Sidebar;
