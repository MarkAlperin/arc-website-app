import React, { useState } from "react";

import DatePicker from "react-datepicker";
import classes from "./TableDatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import getTime from 'date-fns/getTime'

const TableDatePicker = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <span className={classes.span}>
      <div className={classes.picker}>
        <DatePicker
          className={classes.picker}
          placeholderText="Select Date & Start Time"
          showTimeSelect
          dateFormat="MMM d, yyyy h:mmaa"
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => {
            setStartDate(date);
            props.extractStartDate(date);
          }}
        />
      </div>
      <div>
        <DatePicker
          className={classes.picker}
          placeholderText="Select End Time"
          showTimeSelect
          dateFormat="h:mmaa"
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={startDate}
          onChange={(date) => {
            setEndDate(date);
            props.extractEndDate(date);
          }}
        />
      </div>
    </span>
  );
};
export default TableDatePicker;
