import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import GardenPlots from "./garden-plots";
import GardenPlotNewForm from "./garden-plot-new-form";
import GardenPlotDetails from "./garden-plot-detail";
import Journal from "./journal";
import { logout, loadUserData, addError, showInfo, hideInfo } from "../actions";
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

        const information = (
            <div className={this.props.showInformation ? "info-overlay" : "hidden"}>
                <div className="content">
                    <div className="close linkify" onClick={() => this.props.hideInfo()}>x</div>
                    <h2>Information</h2>
                    <p>
                        Click &quot;Add New Crop&quot; tile to populate your plot with this season&apos;s crops.
                    </p>
                    
                    <p>
                        Fill in the specifics for each varietal with information from your seed packet.
                    </p>

                    <p>
                        As your garden develops, record important information in the master journal
                        located at the bottom of the screen.
                    </p>

                    <p>
                        These notes will be saved year to year for handy reference and comparison.
                    </p>
                </div>
            </div>
        );

        return (
            <div className="garden">
                <header>
                    <span className="logo">mcGregor</span>
                    <span className="information linkify" onClick={() => this.props.showInfo()}>information</span>
                    <button className="logout linkify" onClick={() => this.props.logoff()}>log out</button>
                </header>
                <section className="splash-short mcgregor">
                    <h1>welcome, {this.props.username}</h1>
                </section>
                <Switch>
                    <Route exact path ={this.props.match.path} render={() => <GardenPlotsWithProps crops={this.props.crops} />} />
                    <Route exact path ={`${this.props.match.path}/new`} component={GardenPlotNewForm} />
                    <Route exact path ={`${this.props.match.path}/:id`} component={GardenPlotDetails} />
                </Switch>
                <Journal scope={this.props.id} />
                {information}
            </div>
        );
    }
}

Garden.propTypes = {
    crops: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    authToken: PropTypes.string,
    username: PropTypes.string,
    requestedUserFromServer: PropTypes.bool,
    showInformation: PropTypes.bool,
    getUser: PropTypes.func,
    logoff: PropTypes.func,
    showInfo: PropTypes.func,
    hideInfo: PropTypes.func,
    match: PropTypes.object
}

const mapStateToProps = state => ({
    crops: state.garden.crops,
    id: state.garden.id,
    authToken: state.authToken,
    username: state.username,
    requestedUserFromServer: state.requestedUserFromServer,
    showInformation: state.showInformation
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
    },

    showInfo: () => {
        dispatch(showInfo())
    },

    hideInfo: () => {
        dispatch(hideInfo())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Garden);