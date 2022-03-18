import React, { useState, useRef, useContext } from "react";

import classes from "./AddEventForm.module.css";
import TableDatePicker from "../UI/DatePicker/TableDatePicker";
import AuthContext from "../../context/auth-context";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const AddEventForm = (props) => {
  const ctx = useContext(AuthContext);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const calendarTitleRef = useRef("");

  async function addEventHandler(event) {
    console.log(event)
    const response = await fetch(
      "https://react-http-1f2ca-default-rtdb.firebaseio.com/events.json",
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  function submitHandler(event) {
    event.preventDefault();

    const arcEvent = {
      id: Math.random(),
      title: titleRef.current.value,
      calendarTitle: calendarTitleRef.current.value,
      date: startDate,
      startTime: startDate,
      endTime: endDate,
      description: descriptionRef.current.value,
    };
    addEventHandler(arcEvent);
    ctx.showCardHandler();
  }

  const extractStartDate = (temp) => {
    setStartDate(temp);
  };
  const extractEndDate = (temp) => {
    setEndDate(temp);
  };

  return (
    <Card className={classes.summary}>
      <form onSubmit={submitHandler}>
        <h2>Add Event</h2>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="calendarTitle">Calendar Title (22 character maximum)</label>
          <input type="text" maxLength='22' id="calendarTitle" ref={calendarTitleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            rows="auto"
            type="text"
            id="description"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Date and Time</label>
          <TableDatePicker
            extractStartDate={extractStartDate}
            extractEndDate={extractEndDate}
          />
        </div>
        <div className={classes.actions}>
          <Button type="button" onClick={props.onBackHandler}>
            Back
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddEventForm;
