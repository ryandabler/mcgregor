import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";

import "./garden.css";

export function Garden(props) {
    const items = props.crops.map(crop => <GardenPlot key={crop.id}
                                                      info={crop} />);
    return (
        <div className="garden">
            <div className="garden-plots">
                {items}
                <Link className="plain-link" to={"/garden/new"}><GardenPlotNew /></Link>
            </div>
        </div>
    );
}

Garden.propTypes = {
    crops: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
    crops: state.garden.crops
  });
  
  export default connect(mapStateToProps)(Garden);