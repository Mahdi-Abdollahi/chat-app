import React from "react";
import Message from "../Message/Message";

function Messages() {
  return (
    <div>
      <Message owner={true} />
      <Message />
      <Message owner={true} />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;
