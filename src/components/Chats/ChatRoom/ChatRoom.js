import React from "react";
import Avatar from "../../Ui/Avatar/Avatar";
import Button from "../../Ui/Button/Button";
import Input from "../../Ui/Input/Input";
import Messages from "../Messages/Messages";
import { IoMdSend } from "react-icons/io";

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
        <Button
        // onClick={handleSendMessage}
        >
          <IoMdSend className={classes["input-box__icon"]} />
        </Button>
      </div>
    </div>
  );
}

export default ChatRoom;
