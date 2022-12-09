import React from "react";

import classes from "./Input.module.css";

function Input({ onChangeHandler, value: inputValue }) {
  console.log("INPUT");
  return (
    <div className={classes.input}>
      <input
        type="text"
        placeholder="Write a message..."
        value={inputValue}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default Input;
