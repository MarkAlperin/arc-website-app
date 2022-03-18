import React from 'react';

import Button from '../UI/Button/Button';
import classes from "./ArcSummary.module.css";

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>A Club For Competetive Marksmen and Their Families </h2>
      <p>
        I like having coffee with my Mom!
      </p>
      <p>
        These are a bunch of words used to describe the range and facilites.
      </p>
      <Button onClick={props.onClick}>Close</Button>
    </section>
  );
};

export default MealsSummary;
