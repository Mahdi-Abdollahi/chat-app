import React from "react";
import { AVATAR_PIC_BASE_URL } from "../../../data/constants";

import classes from "./Message.module.css";

function Message({ owner }) {
  return (
    <div
      //   ref={ref}
      className={`${classes.message} ${owner && classes.owner}`}
    >
      <div className={classes["messageInfo"]}>
        <img src={AVATAR_PIC_BASE_URL} alt="" />
        <span>just now</span>
      </div>
      <div className={classes["messageContent"]}>
        <p>Hi. How are you???</p>
      </div>
    </div>
  );
}

export default Message;
