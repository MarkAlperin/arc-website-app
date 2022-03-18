import React from 'react'

import EventsList from './EventsList'
import classes from './EventsCard.module.css';

const EventsCard = () => {
  return (
    <div className={classes.eventsCard}>
      <EventsList/>
    </div>
  )
}

export default EventsCard;