import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";
import Journal from "./journal";
import { logout } from "../actions";

import "./garden.css";

export class Garden extends React.Component {
    constructor(props) {
        super();
        this.props = props
    }

    logoff() {
        this.props.dispatch(logout());
    }

    render() {
        if (this.props.authToken === null) {
            return <Redirect to="../" />
        }

        const items = this.props.crops.map(crop =>
            <Link key={crop.id} className="plain-link" to={`/garden/${crop.id}`}>
                <GardenPlot info={crop} />
            </Link>
        );

        return (
            <div className="garden">
                <div className="splash-screen">
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
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    crops: state.garden.crops,
    id: state.garden.id,
    authToken: state.authToken
});
  
  export default connect(mapStateToProps)(Garden);