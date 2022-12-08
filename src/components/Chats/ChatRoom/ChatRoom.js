import React from "react";
import Avatar from "../../Ui/Avatar/Avatar";
import Input from "../../Ui/Input/Input";
import Messages from "../Messages/Messages";

import classes from "./ChatRoom.module.css";

function ChatRoom() {
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Avatar />
        <div className={classes.chatRoomName}>USERNAME</div>
      </div>
      <Messages />
      <div className={classes.textInput}>
        <div className={classes.input}>
          <Input />
        </div>
        <button
        // onClick={handleSendMessage}
        >
          {/* <IoMdSend className={classes["input-box__icon"]} /> */}
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
