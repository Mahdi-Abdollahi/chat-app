import React from "react";
import ChatRoom from "../../Chats/ChatRoom/ChatRoom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <ChatRoom />
    </div>
  );
}

export default Layout;
