import { Fragment } from "react";
import { Route } from "react-router-dom";

import MainHeader from "./components/MainHeader/MainHeader";
import Home from "./components/Home/Home";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <Home />
    </Fragment>
  );
}

export default App;

/* Project Console: https://console.firebase.google.com/project/react-http-1f2ca/overview
Hosting URL: https://react-http-1f2ca.web.app */
