import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewCrop } from "../actions";

import "./garden-plot-new-form.css";

export function GardenPlotNewForm(props) {
    function cancelNewCrop(e) {
        e.preventDefault();
        props.history.push("./");
    }

    function createNewCrop(e) {
        e.preventDefault();

        const cropValues = {};
        Object.keys(e.target.elements).forEach(key => {
            const name = e.target.elements[key].name;
            if (name) cropValues[name] = e.target.elements[key].value;
        });

        props.dispatch(addNewCrop(cropValues));
        props.history.push("../");
    }

    return (
        <form onSubmit={createNewCrop} className="new-crop-form">
            <h2>Add New Crop</h2>
            <div className="new-crop-form-row">
                <label htmlFor="newCropName">Name</label>
                <input id="newCropName" name="name" type="text" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropPlantDate">Plant date</label>
                <input id="newCropPlantDate" name="plant_date" type="date" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropGermDays">Days to germination</label>
                <input id="newCropGermDays" name="germination_days" type="number" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropHarvDays">Days to harvest</label>
                <input id="newCropHarvDays" name="harvest_days" type="number" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropPlantDepth">Planting depth</label>
                <input id="newCropPlantDepth" name="planting_depth" type="number" step=".01" />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropRowSpace">Row spacing</label>
                <input id="newCropRowSpace" name="row_spacing" type="number" step=".01" />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropSeedSpace">Seed spacing</label>
                <input id="newCropSeedSpace" name="seed_spacing" type="number" step=".01" />
            </div>
            <input type="submit" />
            <button onClick={cancelNewCrop}>Cancel</button>
        </form>
    );
}

GardenPlotNewForm.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect()(GardenPlotNewForm);