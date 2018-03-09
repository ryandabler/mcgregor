import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Garden from "./components/garden";

import './App.css';

export function App(props) {
  return (
    <div className="App">
      <Garden crops={props.gardens[0].crops} />
    </div>
  );
}

App.defaultProps = {
  gardens: []
}

App.propTypes = {
  gardens: PropTypes.arrayOf(PropTypes.object)
}

export const mapStateToProps = state => ({
  email: state.email,
  gardens: state.gardens
});

export default connect(mapStateToProps)(App);