import React, { useEffect, useReducer, useState } from "react";
import Button from "../components/Ui/Button/Button";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import classes from "./SignUp.module.css";
import { selectUser, signUpUser } from "../features/userSlice";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

function SignUp() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector(selectUser);
  const [formIsValid, setFormIsValid] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUser({
        email: emailState.value,
        password: passwordState.value,
        userName,
        photoURL: profilePic,
      })
    ).then(() => navigation("/"));
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <div className={classes.form} onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Emain"
            value={emailState.value}
            onChange={emailChangeHandler}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
          />
          <input
            onChange={(e) => setUserName(e.target.value)}
            required
            type="text"
            placeholder="User Name"
            value={userName}
          />
          <input
            onChange={(e) => setProfilePic(e.target.value)}
            type="text"
            placeholder="Profile Picture"
            value={profilePic}
          />
          <Button onClick={handleSubmit}>Sign in</Button>
          {/* {err && <span>Something went wrong</span>} */}
        </div>
        <p>
          You don't have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
