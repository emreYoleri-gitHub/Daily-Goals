import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
