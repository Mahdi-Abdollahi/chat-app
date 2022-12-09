import React, { useEffect, useReducer, useState } from "react";
import Button from "../components/Ui/Button/Button";
import classes from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../features/userSlice";
import { useNavigate, Link } from "react-router-dom";

const userNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val !== state.value };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.val !== state.value };
  }
  return { value: "", isValid: false };
};

const profilePicReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val !== state.value };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.val !== state.value };
  }
  return { value: "", isValid: false };
};

function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector(selectUser);
  const [formIsValid, setFormIsValid] = useState(false);
  const [usernameState, dispatchUsername] = useReducer(userNameReducer, {
    value: currentUser.displayName,
    isValid: true,
  });
  const [profilePicState, dispatchProfilePic] = useReducer(profilePicReducer, {
    value: currentUser.photoURL,
    isValid: true,
  });

  const { isValid: userNameIsValid } = usernameState;
  const { isValid: profilePicIsValid } = profilePicState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(userNameIsValid && profilePicIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [userNameIsValid, profilePicIsValid]);

  const usernameChangeHandler = (e) => {
    dispatchUsername({ type: "USER_INPUT", val: e.target.value });
  };
  const profilePicChangeHandler = (event) => {
    dispatchProfilePic({ type: "USER_INPUT", val: event.target.value });
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };

  const validateProfilePicHandler = () => {
    dispatchProfilePic({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        // user: currentUser,
        newUserName: usernameState.value,
        newProfilePic: profilePicState.value,
      })
    ).then(() => navigation("/"));
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <form onSubmit={submitHandler} autoComplete="off">
          <input
            required
            type="text"
            placeholder="User Name"
            value={usernameState.value}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
          />
          <input
            // required
            type="text"
            placeholder="Profile Picture"
            value={profilePicState.value}
            onChange={profilePicChangeHandler}
            onBlur={validateProfilePicHandler}
          />
          <Button type="submit" disabled={!formIsValid}>
            Update Profile
          </Button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          Back to ChatRoom? <Link to="/">ChatRoom</Link>
        </p>
      </div>
    </div>
  );
}

export default Profile;
