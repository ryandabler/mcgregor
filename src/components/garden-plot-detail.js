import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./garden-plot-detail.css";

export function GardenPlotDetails(props) {
    return (
        <div className="garden-plot-detail">
            <h2>
                {props.crop.name}
                <span className="variety">{props.crop.variety}</span>
            </h2>
            <h3>Grow information</h3>
            <div className="grid group growing-group">
                <span>Plant date</span>
                <span>{props.crop.plant_date}</span>
                <span>Days to germination</span>
                <span>{props.crop.germination_days}</span>
                <span>Days to harvest</span>
                <span>{props.crop.harvest_days}</span>
            </div>
            <h3>Planting information</h3>
            <div className="grid group planting-group">
                <span>Planting depth (in.)</span>
                <span>{props.crop.planting_depth}</span>
                <span>Row spacing (in.)</span>
                <span>{props.crop.row_spacing}</span>
                <span>Seed spacing (in.)</span>
                <span>{props.crop.seed_spacing}</span>
            </div>
            <h3>Journal</h3>
        </div>
    )
}

GardenPlotDetails.propTypes = {
    crop: PropTypes.object
}

const mapStateToProps = (state, props) => {
    const crop = state.garden.crops.find(crop => crop.id === props.match.params.id);
    return {
        crop
    };
};

export default connect(mapStateToProps)(GardenPlotDetails);