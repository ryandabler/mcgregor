import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";
import Journal from "./journal";
import { logout, loadUserData } from "../actions";
import { API_BASE_URL } from "../config";
import { removeTokenFromStorage } from "../utilities";

import "./garden.css";

export class Garden extends React.Component {
    constructor(props) {
        super();
        this.props = props
    }

    componentDidMount() {
        if (!this.props.requestedUserFromServer) this.loadGarden();
    }

    loadGarden() {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.props.authToken}`);

        return fetch(`${API_BASE_URL}/api/users`, {
            method: "GET",
            headers
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
            .then(data => this.props.dispatch(loadUserData(data.users)))
            .catch(err =>
                console.log("AUTH_ERR", err)
            );
    }

    logoff() {
        removeTokenFromStorage();
        this.props.dispatch(logout());
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
                <div className="splash">
                    <button onClick={() => this.logoff()}>Log out</button>
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
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    crops: state.garden.crops,
    id: state.garden.id,
    authToken: state.authToken,
    requestedUserFromServer: state.requestedUserFromServer
});
  
export default connect(mapStateToProps)(Garden);