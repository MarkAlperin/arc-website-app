import React, { Fragment } from "react";

import Navigation from "./Navigation";
import classes from "./Header.module.css";

const MainHeader = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Austin Rifle Club</h1>
        <Navigation />
      </header>
    </Fragment>
  );
};

export default MainHeader;
