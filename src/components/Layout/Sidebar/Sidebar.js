import React from "react";
import { BiLogOut } from "react-icons/bi";
import ChatsList from "../../Chats/ChatsList/ChatsList";
import Input from "../../Ui/Input/Input";
import Avatar from "../../Ui/Avatar/Avatar";
import Button from "../../Ui/Button/Button";

import classes from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <header className={classes.header}>
        <Input />
      </header>
      <ChatsList />
      <footer className={classes["sidebar-footer"]}>
        <Button
        //    onClick={logoutHandler}
        >
          <BiLogOut />
        </Button>
        <Avatar />
        <p>UserName</p>
      </footer>
    </aside>
  );
}

export default Sidebar;
