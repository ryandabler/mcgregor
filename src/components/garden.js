import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GardenPlot from "./garden-plot";
import GardenPlotNew from "./garden-plot-new";
import Journal from "./journal";

import "./garden.css";

export function Garden(props) {
    const items = props.crops.map(crop =>
        <Link key={crop.id} className="plain-link" to={`/garden/${crop.id}`}>
            <GardenPlot info={crop} />
        </Link>
    );

    return (
        <div className="garden">
            <div className="garden-plots">
                {items}
                <Link className="plain-link" to={"/garden/new"}><GardenPlotNew /></Link>
            </div>
            <Journal scope={props.id} />
        </div>
    );
}

Garden.propTypes = {
    crops: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string
}

const mapStateToProps = state => ({
    crops: state.garden.crops,
    id: state.garden.id
});
  
  export default connect(mapStateToProps)(Garden);