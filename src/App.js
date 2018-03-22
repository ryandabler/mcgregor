import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import LandingPage from "./components/landing-page";
import Garden from "./components/garden";
import GardenPlotNewForm from "./components/garden-plot-new-form";
import GardenPlotDetails from "./components/garden-plot-detail";

import './App.css';

export function App() {
	return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/garden" component={Garden} />
						<Route exact path="/garden/new" component={GardenPlotNewForm} />
						<Route exact path="/garden/:id" component={GardenPlotDetails} />
					</Switch>
				</div>
			</Router>
	);
}

export default connect()(App);