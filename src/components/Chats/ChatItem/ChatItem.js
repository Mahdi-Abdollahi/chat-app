import React from "react";
import Avatar from "../../Ui/Avatar/Avatar";

import classes from "./ChatItem.module.css";
function ChatItem({ userInfo }) {
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
          Hi, How are you? every things okey?😅
        </div>
      </div>
      <time className={classes["chat-item__time"]}>14:23</time>
    </div>
  );
}

export default ChatItem;
