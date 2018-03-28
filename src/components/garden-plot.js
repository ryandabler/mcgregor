import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteCrop } from "../actions";
import { queryServer, makeDateFromISOString } from "../utilities";

import "./garden-plot.css";

export function GardenPlot(props) {
    function deleteCard() {
        queryServer("DELETE", `crops/${props.info.id}`, props.authToken)
            .then(() => props.dispatch(deleteCrop(props.info.id)));
    }

    const date = makeDateFromISOString(new Date(props.info.plant_date).toISOString());

    return (
        <div className="garden-plot">
            <span onClick={deleteCard} className="x">x</span>
            <Link className="plain-link" to={`/garden/${props.info.id}`}>
                <h2>{props.info.name}</h2>
                <h3 className="variety">{props.info.variety}</h3>
                <div className="garden-plot-info">
                    <span>Plant date</span>
                    <span>{date.toLocaleDateString()}</span>
                </div>
                <div className="garden-plot-info">
                    <span>Germination days</span>
                    <span>{props.info.germination_days}</span>
                </div>
                <div className="garden-plot-info">
                    <span>Harvest days</span>
                    <span>{props.info.harvest_days}</span>
                </div>
            </Link>
        </div>
    );
}

GardenPlot.propTypes = {
    info: PropTypes.object,
    authToken: PropTypes.string,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    authToken: state.authToken
});

export default connect(mapStateToProps)(GardenPlot);