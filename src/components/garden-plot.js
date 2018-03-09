import React from "react";
import PropTypes from "prop-types";

import "./garden-plot.css";

export default function GardenPlot(props) {
    return (
        <div className="garden-plot">
            <h2>{props.info.name}</h2>
            <div>
                <span>Plant date</span>
                <span>{props.info.plant_date}</span>
            </div>
            <div>
                <span>Germination days</span>
                <span>{props.info.germination_days}</span>
            </div>
            <div>
                <span>Harvest days</span>
                <span>{props.info.harvest_days}</span>
            </div>
        </div>
    );
}

GardenPlot.propTypes = {
    info: PropTypes.object
}
