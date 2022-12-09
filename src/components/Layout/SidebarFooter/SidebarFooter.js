import React, { memo } from "react";
import Avatar from "../../Ui/Avatar/Avatar";
import Button from "../../Ui/Button/Button";
import { BiLogOut } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";

import classes from "./SidebarFooter.module.css";

function SidebarFooter({ currentUser, handleLogOut, handleEditProfile }) {
  return (
    <footer className={classes["sidebar-footer"]}>
      <Button onClick={handleLogOut}>
        <BiLogOut />
      </Button>
      <div className={classes["sidebar-user"]}>
        <Button onClick={handleEditProfile}>
          <AiFillEdit />
        </Button>
        <Avatar src={currentUser.photoURL} />
        <p className={classes["sidebar-user-name"]}>
          {currentUser.displayName}
        </p>
      </div>
    </footer>
  );
}

export default memo(SidebarFooter);
