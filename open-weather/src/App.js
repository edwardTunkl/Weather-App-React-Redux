import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import Main from './Components/Main';

const App = () => {
  return (
    <Router>
   <Main />
    </Router>
  );
}

export default App;
