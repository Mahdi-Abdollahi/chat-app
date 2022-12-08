import React from "react";
import Message from "../Message/Message";

import classes from "./Messages.module.css";

function Messages() {
  return (
    <div className={classes.container}>
      <Message owner={true} />
      <Message />
      <Message owner={true} />
      <Message />
      <Message />
      <Message owner={true} />
      <Message />
      <Message />
      <Message owner={true} />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;
