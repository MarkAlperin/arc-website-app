import React, { useState, useEffect } from "react";

// AuthContext is not a component, but it is an object that will contain a component
const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
  showCard: "",
  events: [],
  specificEvents: [],
  selectedDate: {},
  eventsListView: true,
  onLoadEvents: () => {},
  onLoadSpecificEvents: () => {},
  showCardHandler: () => {},
  onLogout: () => {},
  onLogin: (email, password) => {},
  onRegister: (userData) => {},
  selectDate: () => {},
});

// AuthContextProvider is a named export rather than a default export
export const AuthContextProvider = (props) => {
  const date = new Date();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [card, setCard] = useState("summary");
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const [eventsListView, setEventListView] = useState(true);
  const [specificEvents, setSpecificEvents] = useState([]);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedUserIsAdminInformation = localStorage.getItem("isAdmin");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }

    if (storedUserIsAdminInformation === "1") {
      setIsAdmin(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userData");
    setIsAdmin(false);
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    const admin = true; // TODO: implement admin stuff and authentification stuff
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    if (admin) {
      localStorage.setItem("isAdmin", "1");
      setIsAdmin(true);
    }
  };

  const registerHandler = (enteredData) => {
    const userData = {
      ...enteredData,
      id: Math.random().toString(),
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const showCardHandler = (cardInput = null) => {
    setCard(cardInput);
  };

  const loadEventsHandler = (newEvents) => {
    setEvents(newEvents);
  };

  const selectDate = (day) => {
    setSelectedDate(day);
  };

  const eventsListViewHandler = (bool = false) => {
    setEventListView(bool);
  };

  const loadSpecificEventsHandler = (newEvents) => {
    setSpecificEvents(newEvents);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        showCard: card,
        events: events,
        specificEvents: specificEvents,
        selectedDate: selectedDate,
        eventsListView: eventsListView,
        showCardHandler: showCardHandler,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onLoadEvents: loadEventsHandler,
        onLoadSpecificEvents: loadSpecificEventsHandler,
        selectDate: selectDate,
        eventsListViewHandler: eventsListViewHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
