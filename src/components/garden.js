import React from "react";
import PropTypes from "prop-types";
import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";

import "./garden.css";

export default function Garden(props) {
    const items = props.crops.map(crop => <GardenPlot key={crop.id}
                                                      info={crop} />);
    
    return (
        <div className="garden">
            {items}
            <GardenPlotNew />
        </div>
    );
}

Garden.propTypes = {
    crops: PropTypes.arrayOf(PropTypes.object)
}
