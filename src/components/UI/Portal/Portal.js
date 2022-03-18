import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import styles from "./Portal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};


// FIXME: Portal is bugged
const Portal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        {props.children},
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default Portal;
