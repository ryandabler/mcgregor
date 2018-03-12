import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Garden from "./components/garden";
import GardenPlotNewForm from "./components/garden-plot-new-form";

import './App.css';

export function App(props) {
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

App.defaultProps = {
  gardens: []
}

App.propTypes = {
  gardens: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
  email: state.email,
  gardens: state.gardens
});

export default connect(mapStateToProps)(App);