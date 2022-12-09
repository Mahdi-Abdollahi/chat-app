import React from "react";
import Avatar from "../../Ui/Avatar/Avatar";

import classes from "./ChatItem.module.css";
function ChatItem({ userInfo, lastMessage }) {
  //   const { displayName, photoURL, uid } = userInfo;
  return (
    <div className={classes["chat-item"]}>
      <Avatar
        src={userInfo.photoURL}
        className={classes["chat-item__avatar"]}
      />
      <div className={classes["chat-item__details"]}>
        <h3 className={classes["chat-item__user-name"]}>
          {userInfo.displayName}
        </h3>
        <div className={classes["chat-item__message"]}>
          {lastMessage?.text || null}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
