import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import "./Calendar.css";
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
} from "date-fns";

const Cells = (props) => {
  const ctx = useContext(AuthContext);

  const monthStart = startOfMonth(props.currentMonth);
  const monthEnd = endOfMonth(props.currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      let hasEvent;
      formattedDate = format(day, "d");
      const cloneDay = day;

      let daySpecificEvents = [];
      ctx.events.forEach((event) => {
        if (isSameDay(cloneDay, new Date(event.date))) {
          daySpecificEvents.push(event);
          hasEvent = true;
        }
      });

      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, props.selectedDate)
              ? "selected"
              : ""
          }`}
          key={day}
          onClick={() => props.onDateClick(cloneDay)}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
          {hasEvent && daySpecificEvents.map((event) => {
            return <li className={'event'} key={event.id}>{event.calendarTitle}</li>
          })}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export default Cells;
