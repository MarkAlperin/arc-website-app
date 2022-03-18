import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import AuthContext from "../../../context/auth-context";

// this is made outside of the component function
const emailReducer = (state, payload) => {
  if (payload.type === "USER_INPUT") {
    return { value: payload.val, isValid: payload.val.includes("@") };
  }
  if (payload.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, payload) => {
  if (payload.type === "USER_INPUT") {
    return { value: payload.val, isValid: payload.val.trim().length > 6 };
  }
  if (payload.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

// ****************************************************************************
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const loginCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // these are just object destructuring examples the isValid property of emailState is held in the emailIsValid reference/alias
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity.");
      setFormIsValid(passwordIsValid && emailIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      loginCtx.onLogin(emailState.value, passwordState.value);
      props.stopLoginHandler()
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        ref={emailInputRef} // this ref is only usable by whatever is exposed in the useImperativeHandle hook
        id="email"
        label="E-Mail"
        type="email"
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
      <Input
        ref={passwordInputRef}
        id="password"
        label="Password"
        type="password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
      />
      <div className={classes.actions}>
        <Button
          type="button"
          className={classes.btn}
          onClick={props.stopLoginHandler}
        >
          Back
        </Button>
        <Button
          type="button"
          className={classes.btn}
          onClick={props.registerHandler}
        >
          Register
        </Button>
        <Button type="submit" className={classes.btn}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
