import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUserChatWithin } from "../../../features/chatSlice";
import { selectUser } from "../../../features/userSlice";

import classes from "./Message.module.css";

function Message({ messageInfo, isOwner }) {
  const currentUser = useSelector(selectUser);
  const otherUser = useSelector(selectUserChatWithin);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageInfo]);

  return (
    <div ref={ref} className={`${classes.message} ${isOwner && classes.owner}`}>
      <div className={classes["messageInfo"]}>
        <img
          src={
            messageInfo.senderId === currentUser.uid
              ? currentUser.photoURL
              : otherUser.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className={classes["messageContent"]}>
        <p>{messageInfo.text}</p>
      </div>
    </div>
  );
}

export default Message;
