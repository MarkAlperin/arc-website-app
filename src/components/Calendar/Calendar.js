import React, { useState, useContext } from "react";

import CalendarHeader from "./CalendarHeader";
import Cells from "./Cells";
import AuthContext from "../../context/auth-context";
import { addMonths, subMonths, isSameDay } from "date-fns";
import "./Calendar.css";

const Calendar = () => {
  const date = new Date();
  const ctx = useContext(AuthContext);

  const [currentMonth, setCurrentMonth] = useState(date);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    ctx.selectDate(day);
    const loadedEvents = [];
    ctx.events.forEach((event) => {
      if (isSameDay(day, new Date(event.date))) {
        loadedEvents.push(event);
      }
    });
    ctx.onLoadSpecificEvents(loadedEvents);
    ctx.eventsListViewHandler();
  };

  const headerClickHandler = () => {
    ctx.eventsListViewHandler(true);
  };

  return (
    <div className="calendar">
      <CalendarHeader
        onClick={headerClickHandler}
        className="header"
        currentMonth={currentMonth}
        selectedDate={ctx.selectedDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <Cells
        currentMonth={currentMonth}
        selectedDate={ctx.selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default Calendar;
