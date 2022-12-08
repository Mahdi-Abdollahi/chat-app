import React from "react";
// import SidebarFooter from "./SidebarFooter";

import classes from "./Sidebar.module.css";
import ChatsList from "../../Chats/ChatsList/ChatsList";
import Input from "../../Ui/Input/Input";
import Avatar from "../../Ui/Avatar/Avatar";

function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <header className={classes.header}>
        <Input />
      </header>
      <ChatsList />
      <footer className={classes["sidebar-footer"]}>
        {/* <button
        //    onClick={logoutHandler}
        >
          <BiLogOut />
        </button> */}
        <Avatar />
        <p>UserName</p>
      </footer>
    </aside>
  );
}

export default Sidebar;
