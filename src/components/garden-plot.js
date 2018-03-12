import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteCrop } from "../actions";

import "./garden-plot.css";

export function GardenPlot(props) {
    function deleteCard() {
        props.dispatch(deleteCrop(props.info.id));
    }

    return (
        <div className="garden-plot">
            <span onClick={deleteCard} className="x">x</span>
            <h2>{props.info.name}</h2>
            <div className="garden-plot-info">
                <span>Plant date</span>
                <span>{props.info.plant_date}</span>
            </div>
            <div className="garden-plot-info">
                <span>Germination days</span>
                <span>{props.info.germination_days}</span>
            </div>
            <div className="garden-plot-info">
                <span>Harvest days</span>
                <span>{props.info.harvest_days}</span>
            </div>
        </div>
    );
}

GardenPlot.propTypes = {
    info: PropTypes.object
}

export default connect()(GardenPlot);