import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from 'styled-components';

import classes from "./EventsList.module.css";
import Event from "./Event";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button.js";
import format from "date-fns/format";

const EventsList = (props) => {
  const ctx = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEventsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-1f2ca-default-rtdb.firebaseio.com/events.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await response.json();
      const loadedEvents = [];

      for (const key in data) {
        loadedEvents.push({
          id: key,
          title: data[key].title,
          calendarTitle: data[key].calendarTitle,
          description: data[key].description,
          date: data[key].date,
          startTime: format(new Date(data[key].startTime), "MMM d  h:mmaa"),
          endTime: format(new Date(data[key].endTime), "p"),
        });
      }
      setEvents(loadedEvents);
      ctx.onLoadEvents(loadedEvents);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEventsHandler();
  }, [fetchEventsHandler]);

  let content = <h2 className={classes.none}>Found no Events </h2>;

  if (
    (events.length > 0 && ctx.eventsListView) ||
    (ctx.specificEvents.length > 0 && !ctx.eventsListView)
  ) {
    content = (
      <StyledDiv>
        {!ctx.eventsListView && <Button onClick={ctx.eventsListViewHandler}>List View</Button>}
        <ul className={classes["events-list"]}>
          {(ctx.eventsListView ? events : ctx.specificEvents).map((event) => {
            return (
              <Event
                key={event.id}
                description={event.description}
                title={event.title}
                date={event.date}
                startTime={event.startTime}
                endTime={event.endTime}
                calendarTitle={event.calendarTitle}
              />
            );
          })}
        </ul>
      </StyledDiv>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <section>{content}</section>;
};

export default EventsList;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
`;