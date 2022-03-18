import React, { useState, useRef, useContext } from "react";

import Button from "../../UI//Button/Button.js";
import AuthContext from "../../../context/auth-context";
import classes from "./User.module.css";

const RegisterForm = (props) => {
  const usernameInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [isComplete, setIsComplete] = useState(true);

  const loginCtx = useContext(AuthContext);

  const registerHandler = (event) => {
    event.preventDefault();
    if (
      usernameInputRef.current.value.trim().length === 0 ||
      firstNameInputRef.current.value.trim().length === 0 ||
      lastNameInputRef.current.value.trim().length === 0 ||
      passwordInputRef.current.value.trim().length === 0 ||
      emailInputRef.current.value.trim().length === 0
    ) {
      setIsComplete(false);
      return;
    }
    const enteredUserData = {
      username: usernameInputRef.current.value,
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      password: passwordInputRef.current.value,
      email: emailInputRef.current.value,
    };
    loginCtx.onRegister(enteredUserData);
    props.submitRegisterHandler();
  };

  return (
    <form onSubmit={registerHandler}>
      <h2 style={{ color: !isComplete ? "red" : "black" }}>Register</h2>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" ref={usernameInputRef} />
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" type="text" ref={firstNameInputRef} />
      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" type="text" ref={lastNameInputRef} />
      <label htmlFor="password">Password</label>
      <input id="password" type="text" ref={passwordInputRef} />
      <label htmlFor="email">Email</label>
      <input id="email" type="text" ref={emailInputRef} />
      {!isComplete && <p style={{ color: "red" }}>Form Incomplete</p>}
      <div className={classes.actions}>
        <Button type="button" onClick={props.onBackHandler}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default RegisterForm;
