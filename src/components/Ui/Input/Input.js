import React from "react";

import classes from "./Input.module.css";

function Input() {
  return (
    <div className={classes.input}>
      <input
        type="text"
        placeholder="Write a message..."
        // value={text}
        // onChange={(e) => inputChangeHandler(e)}
      />
    </div>
  );
}

export default Input;
