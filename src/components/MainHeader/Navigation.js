import React, { useContext, useState, Fragment } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import LoginCard from "./Login/LoginCard";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginButtonHandler = () => {
    setIsLoggingIn(true);
  };

  const stopLoginHandler = () => {
    setIsLoggingIn(false);
  };

  const userClickHandler = () => {
    console.log('Navigation Bar \'User\' Click');
  };
  const adminClickHandler = () => {
    console.log('Navigation Bar \'User\' Click');
    ctx.showCardHandler('addEvent');

  };

  return (
    <Fragment>
      {isLoggingIn && <LoginCard stopLoginHandler={stopLoginHandler} />}
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <p className={classes.p} onClick={userClickHandler}>User</p>
            </li>
          )}
          {ctx.isAdmin && (
            <li>
              <p className={classes.p} onClick={adminClickHandler}>Admin</p>
            </li>
          )}
          {!ctx.isLoggedIn && (
            <li>
              <Button onClick={loginButtonHandler}>Login</Button>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <Button onClick={ctx.onLogout}>Logout</Button>
            </li>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
