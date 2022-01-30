import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";

import Main from "./Components/Main";

const App = () => {
  return (
    <div id="app-background">
      <Router>
        <Main />
      </Router>
    </div>
  );
};

export default App;
