import React, { useState } from "react";

import classes from "./Event.module.css";

const Event = (props) => {
  const [showDescription, setShowDescription] = useState(false);

  const onClickHandler = () => {
    setShowDescription(!showDescription);
  };

  return (
    <li className={classes.event} onClick={onClickHandler}>
      <h2>{props.title}</h2>
      <p>
        {props.startTime} - {props.endTime}
      </p>
      {showDescription && <p>{props.description}</p>}
    </li>
  );
};

export default Event;
