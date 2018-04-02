import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";

import "./garden-plots.css";

export default function GardenPlots(props) {
    const items = props.crops.map(crop =>
        <GardenPlot key={crop.id} info={crop} />
    );

    return (
        <div className="garden-plots">
            {items}
            <Link className="plain-link" to={"/garden/new"}><GardenPlotNew /></Link>
        </div>
    );
}

GardenPlots.propTypes = {
    crops: PropTypes.arrayOf(PropTypes.object),
}

// export default connect()(GardenPlots);