import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import GardenPlots from "./garden-plots";
import GardenPlotNewForm from "./garden-plot-new-form";
import GardenPlotDetails from "./garden-plot-detail";
import Journal from "./journal";
import { logout, loadUserData, addError } from "../actions";
import { removeTokenFromStorage, queryServer } from "../utilities";

import "./garden.css";

export class Garden extends React.Component {
    constructor(props) {
        super();
        this.props = props
    }

    componentDidMount() {
        if (!this.props.requestedUserFromServer) this.props.getUser(this.props.authToken);
    }

    render() {
        if (this.props.authToken === null) {
            return <Redirect to="../" />
        }

        const GardenPlotsWithProps = props => (
            <GardenPlots crops={props.crops} />
        );

        return (
            <div className="garden">
                <header>
                    <span className="logo">mcGregor</span>
                    <button className="logout" onClick={() => this.props.logoff()}>log out</button>
                </header>
                <section className="splash-short mcgregor">
                </section>
                <Switch>
                    <Route exact path ={this.props.match.path} render={() => <GardenPlotsWithProps crops={this.props.crops} />} />
                    <Route exact path ={`${this.props.match.path}/new`} component={GardenPlotNewForm} />
                    <Route exact path ={`${this.props.match.path}/:id`} component={GardenPlotDetails} />
                </Switch>
                <Journal scope={this.props.id} />
            </div>
        );
    }
}

Garden.propTypes = {
    crops: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    authToken: PropTypes.string,
    requestedUserFromServer: PropTypes.bool,
    getUser: PropTypes.func,
    logoff: PropTypes.func,
    match: PropTypes.object
}

const mapStateToProps = state => ({
    crops: state.garden.crops,
    id: state.garden.id,
    authToken: state.authToken,
    requestedUserFromServer: state.requestedUserFromServer
});

const mapDispatchToProps = dispatch => ({
    getUser: (authToken) => {
        queryServer("GET", "users", authToken)
            .then(res => res.json())
            .then(data => dispatch(loadUserData(data.users)))
            .catch(err => dispatch(addError(err.code, err.message)));
    },
    
    logoff: () => {
        removeTokenFromStorage();
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Garden);