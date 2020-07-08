import React from "react";
import "./App.css";
import search from "./component/search";
import orderParts from "./component/orderParts";
import login from "./component/login";
import afterlogin from "./component/afterlogin";
import bookSuccess from "./component/bookSuccess";
import bookFailure from "./component/bookFailure";
import { WelcomeHeader } from "./component/WelcomeHeader.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <WelcomeHeader />
      <Router>
        <Switch>
          <Route exact path="/" component={search} />
          <Route exact path="/login" component={login} />
          <Route exact path="/orderParts" component={orderParts} />
          <Route exact path="/afterlogin" component={afterlogin} />
          <Route exact path="/bookSuccess" component={bookSuccess} />
          <Route exact path="/bookFailure" component={bookFailure} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
