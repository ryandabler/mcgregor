import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";
import Journal from "./journal";
import { logout, loadUserData } from "../actions";
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

        const items = this.props.crops.map(crop =>
            <GardenPlot key={crop.id} info={crop} />
        );

        return (
            <div className="garden">
                <div className="splash-short mcgregor">
                    <button className="logout" onClick={() => this.props.logoff()}>log out</button>
                </div>
                <div className="garden-plots">
                    {items}
                    <Link className="plain-link" to={"/garden/new"}><GardenPlotNew /></Link>
                </div>
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
    logoff: PropTypes.func
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
            .then(data => dispatch(loadUserData(data.users)));
    },
    
    logoff: () => {
        removeTokenFromStorage();
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Garden);