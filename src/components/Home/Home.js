import React, { useContext, Fragment } from "react";

import ArcSummary from "./ArcSummary";
import Calendar from "../Calendar/Calendar";
import Slideshow from "../Slideshow/Slideshow";
import AuthContext from "../../context/auth-context";
import AddEventForm from "../Events/AddEventForm";
import EventsCard from "../Events/EventsCard";
import classes from "./Home.module.css";

const Home = (props) => {
  const ctx = useContext(AuthContext);

  const dismissSummary = () => {
    ctx.showCardHandler();
  };

  return (
    <div className={classes.body}>
      <Slideshow />
      {ctx.showCard === "summary" && !ctx.isLoggedIn && (
        <ArcSummary onClick={dismissSummary} />
      )}
      {ctx.showCard === "addEvent" && (
        <AddEventForm onBackHandler={dismissSummary} />
      )}
      <section className={classes["cal-events"]}>
        <Calendar />
        <EventsCard />
      </section>
    </div>
  );
};

export default Home;

/* const Cal = () => {
  return (
    <div className="App">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            react<b>calendar</b>
          </span>
        </div>
      </header>
      <main>
        <Calendar />
      </main>
    </div>
  );
}; */
