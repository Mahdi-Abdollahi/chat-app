import React from "react";
import Button from "../components/Ui/Button/Button";
import { useNavigate, Link } from "react-router-dom";

import classes from "./Login.module.css";

function Login() {
  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <form
        // onSubmit={handleSubmit}
        >
          <input required type="email" placeholder="Emain" />
          <input required type="password" placeholder="Password" />
          <Button>Sign in</Button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
