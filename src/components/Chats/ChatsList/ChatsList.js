import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import ChatItem from "../ChatItem/ChatItem";

import classes from "./ChatsList.module.css";

import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { selectChat, selectChatId, setChat } from "../../../features/chatSlice";

function ChatsList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser, dispatch]);

  const handleSelect = (userInfo) => {
    dispatch(
      setChat({
        chatId:
          currentUser.uid > userInfo.uid
            ? currentUser.uid + userInfo.uid
            : userInfo.uid + currentUser.uid,
        user: userInfo,
      })
    );
  };
  const renderChats = chats?.length
    ? chats
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => {
          return (
            <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              <ChatItem
                userInfo={chat[1].userInfo}
                lastMessage={chat[1]?.lastMessage || null}
                date={chat[1]?.date || null}
              />
            </div>
          );
        })
    : null;

  return <div className={classes["chats-list"]}>{renderChats}</div>;
}

export default ChatsList;
