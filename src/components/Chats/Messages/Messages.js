import React, { memo, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Message from "../Message/Message";

import classes from "./Messages.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";

function Messages({ chat }) {
  const currentUser = useSelector(selectUser);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = () => {
      const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    };
    chat.chatId && getMessages();
  }, [chat.chatId]);

  console.log("MESSAGES");

  return (
    <div className={classes.container}>
      {messages?.length &&
        messages.map((message) => (
          <Message
            isOwner={message.senderId === currentUser.uid}
            messageInfo={message}
            key={message.id}
          />
        ))}
    </div>
  );
}

export default memo(Messages);
