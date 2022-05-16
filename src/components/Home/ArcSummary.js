import React from 'react';

import Button from '../UI/Button/Button';
import classes from "./ArcSummary.module.css";

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>This is a practice website made with React.js </h2>
      <p>
        Feel free to click around on the calendar or events
      </p>
      <p>
        If you would like to make an event, first login (any email and password will do).
      </p>
      <Button onClick={props.onClick}>Close</Button>
    </section>
  );
};

export default MealsSummary;
