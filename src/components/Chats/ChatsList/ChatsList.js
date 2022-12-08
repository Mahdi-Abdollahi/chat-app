import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../../features/userSlice";
// import ChatItem from "./ChatItem";

// import styles from "./ChatsList.module.css";

// import { db } from "../../firebase";
// import { doc, onSnapshot } from "firebase/firestore";
// import { changeUser } from "../../features/chatSlice";
function ChatsList() {
  //   const dispatch = useDispatch();
  //   const [chats, setChats] = useState([]);
  //   const user = useSelector(selectUser);
  //   console.log("chats: ", chats);
  //   useEffect(() => {
  //     const getChats = () => {
  //       const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
  //         setChats(doc.data());
  //       });

  //       return () => {
  //         unsub();
  //       };
  //     };

  //     user.uid && getChats();
  //   }, [user]);

  //   const handleSelect = (chatInfo) => {
  //     dispatch(changeUser(chatInfo));
  //   };

  //   return (
  //     <div className={styles["chats-list"]}>
  //       {Object.keys(chats)?.length
  //         ? Object.entries(chats).map((chatItem) => (
  //             <div
  //               style={{ cursor: "pointer" }}
  //               onClick={() =>
  //                 handleSelect({
  //                   newUser: chatItem[1].userInfo,
  //                   currentUser: user,
  //                 })
  //               }
  //             >
  //               <ChatItem userInfo={chatItem[1].userInfo} key={chatItem[0]} />
  //             </div>
  //           ))
  //         : null}
  //     </div>
  //   );
  return (
    <>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
    </>
  );
}

export default ChatsList;
