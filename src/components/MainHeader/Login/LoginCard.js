import React, { useState, useContext, Fragment } from "react";
import ReactDOM from "react-dom";

import Login from "./Login.js";
import AuthContext from "../../../context/auth-context";
import RegisterForm from "./RegisterForm.js";
import Card from "../../UI/Card/Card.js";
import styles from "./User.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop.js";

// *** SIGN IN CARD ***
const LoginCard = (props) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const loginCtx = useContext(AuthContext);

  const registerClickHandler = (event) => {
    setIsRegistering(true);
  };

  const registerBackHandler = () => {
    setIsRegistering(false);
  };

  const submitRegisterHandler = () => {
    props.stopLoginHandler();
  };

  const loginHandler = (enteredData) => {
    localStorage.setItem("userData", JSON.stringify(enteredData));
    //localStorage.setItem("isLoggedIn", "1");
    props.confirmedLogin();
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.stopLoginHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className={`${styles.input} ${styles.modal}`}>
          {!isRegistering && (
            <Login
              //loginHandler={loginHandler}
              registerHandler={registerClickHandler}
              stopLoginHandler={props.stopLoginHandler}
            />
          )}
          {isRegistering && (
            <RegisterForm
              submitRegisterHandler={submitRegisterHandler}
              onBackHandler={registerBackHandler}
            />
          )}
        </Card>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default LoginCard;
