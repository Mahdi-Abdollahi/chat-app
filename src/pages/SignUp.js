import React, { useEffect, useReducer, useState } from "react";
import Button from "../components/Ui/Button/Button";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import classes from "./SignUp.module.css";
import { signUpUser } from "../features/userSlice";

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
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};
const userNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 0 };
  }
  return { value: "", isValid: false };
};

function SignUp() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [usernameState, dispatchUsername] = useReducer(userNameReducer, {
    value: "",
    isValid: true,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: userNameIsValid } = usernameState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && userNameIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, userNameIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUser({
        email: emailState.value,
        password: passwordState.value,
        userName: usernameState.value,
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
  const usernameChangeHandler = (e) => {
    dispatchUsername({ type: "USER_INPUT", val: e.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
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
            onBlur={validateEmailHandler}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <input
            onChange={usernameChangeHandler}
            required
            type="text"
            placeholder="User Name"
            value={usernameState.value}
            onBlur={validateUsernameHandler}
          />
          <input
            onChange={(e) => setProfilePic(e.target.value)}
            type="text"
            placeholder="Profile Picture"
            value={profilePic}
          />
          <Button disabled={!formIsValid} onClick={handleSubmit}>
            Sign in
          </Button>
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
