import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Garden from "./components/garden";
import GardenPlotNewForm from "./components/garden-plot-new-form";

import './App.css';

export function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Garden} />
          <Route exact path="/garden/new" component={GardenPlotNewForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default connect()(App);