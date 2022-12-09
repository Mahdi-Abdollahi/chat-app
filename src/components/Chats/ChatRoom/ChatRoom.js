import React, { useState } from "react";
import Avatar from "../../Ui/Avatar/Avatar";
import Button from "../../Ui/Button/Button";
import Input from "../../Ui/Input/Input";
import Messages from "../Messages/Messages";
import { IoMdSend } from "react-icons/io";

import classes from "./ChatRoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../../features/chatSlice";
import { sendMessage } from "../../../features/messageSlice";
import { selectUser } from "../../../features/userSlice";

function ChatRoom() {
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const currentUser = useSelector(selectUser);
  const { chatId, user: userChatWithin } = chat;
  const [textInput, setTextInput] = useState("");
  const handleSendMessage = async () => {
    dispatch(
      sendMessage({
        text: textInput,
        senderId: currentUser.uid,
        receiverId: userChatWithin.uid,
        chatId,
      })
    );
    setTextInput("");
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Avatar src={userChatWithin.photoURL} />
        <div className={classes.chatRoomName}>{userChatWithin.displayName}</div>
      </div>
      <Messages chat={chat} />
      <div className={classes.textInput}>
        <div className={classes.input}>
          <Input
            value={textInput}
            onChangeHandler={(e) => setTextInput(e.target.value)}
          />
        </div>
        <Button onClick={handleSendMessage}>
          <IoMdSend className={classes["input-box__icon"]} />
        </Button>
      </div>
    </div>
  );
}

export default ChatRoom;
