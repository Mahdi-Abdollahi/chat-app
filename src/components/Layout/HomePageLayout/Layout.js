import React from "react";
import ChatRoom from "../../Chats/ChatRoom/ChatRoom";
import Sidebar from "../Sidebar/Sidebar";
import classes from "./Layout.module.css";

function Layout() {
  return (
    <div className={classes.layout}>
      <Sidebar />
      <ChatRoom />
    </div>
  );
}

export default Layout;
