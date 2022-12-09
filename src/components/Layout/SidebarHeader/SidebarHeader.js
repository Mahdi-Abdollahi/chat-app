import React, { memo } from "react";
import Button from "../../Ui/Button/Button";
import Input from "../../Ui/Input/Input";

import classes from "./SidebarHeader.module.css";

function SidbarHeader({ inputValue, onChangeHandler, onSearchUserHandler }) {
  return (
    <header className={classes.header}>
      <Input
        placeHolder="Find a User to Chat."
        onChangeHandler={onChangeHandler}
        value={inputValue}
      />
      <Button onClick={onSearchUserHandler}>Find</Button>
    </header>
  );
}

export default memo(SidbarHeader);
