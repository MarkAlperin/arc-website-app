import React, { useState, useContext, useEffect, Fragment } from "react";

import AuthContext from "../../context/auth-context";
import { format } from "date-fns";
import "./Calendar.css";

const CalendarHeader = (props) => {
  const ctx = useContext(AuthContext);

  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (ctx.eventsListView) {
      return;
    }
    setIsHighlighted(true);

    setTimeout(() => {
      setIsHighlighted(false);
    }, 300);
  }, [ctx.eventsListView]);

  const headerClickHandler = () => {
    ctx.eventsListViewHandler(true);
  };

  const headerClasses = `col col-center ${
    !ctx.eventsListView ? "colorize" : ""
  } ${isHighlighted ? "bump" : ""}`;
  return (
    <Fragment>
      <div className="header row flex-middle">
        <div className="col col-start">
          <span className="icon" onClick={props.prevMonth}>
            chevron_left
          </span>
        </div>
        <div className={headerClasses}>
          <span onClick={headerClickHandler}>
            {format(props.currentMonth, "MMMM yyyy")}
          </span>
        </div>
        <div className="col col-end" onClick={props.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
      <div className="days row">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
      </div>
    </Fragment>
  );
};

export default CalendarHeader;
