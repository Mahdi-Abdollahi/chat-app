import React, { useEffect, useReducer, useState } from "react";
import Button from "../components/Ui/Button/Button";
import { useNavigate, Link } from "react-router-dom";

import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { logInUser } from "../features/userSlice";

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

function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [formIsValid, setFormIsValid] = useState(false);

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
      logInUser({ email: emailState.value, password: passwordState.value })
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
        <form onSubmit={handleSubmit}>
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
          <Button disable={!formIsValid} onClick={handleSubmit}>
            Sign in
          </Button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          You don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
