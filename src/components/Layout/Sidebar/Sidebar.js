import React from "react";
// import SidebarFooter from "./SidebarFooter";

import styles from "./Sidebar.module.css";
import ChatsList from "../../Chats/ChatsList/ChatsList";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <header>{/* INPUT COMPONENT */}</header>
      <ChatsList />
      <footer className={styles["sidebar-footer"]}>
        <button
        //    onClick={logoutHandler}
        >
          {/* <BiLogOut /> */}
        </button>
        {/* <Avatar src={photoURL} /> */}
        <p>UserName</p>
      </footer>
    </aside>
  );
}

export default Sidebar;
