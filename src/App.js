import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ErrorContainer from "./components/error-container";
import LandingPage from "./components/landing-page";
import Garden from "./components/garden";

import './App.css';

export function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/garden" component={Garden} />
				</Switch>
				<ErrorContainer />
			</div>
		</Router>
	);
}

export default connect()(App);