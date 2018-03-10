import React from "react";
import PropTypes from "prop-types";

import "./garden-plot-new-form.css";

export default function GardenPlotNewForm(props) {
    function cancelNewCrop(e) {
        e.preventDefault();
        props.history.push("../../");
    }

    function createNewCrop(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={createNewCrop} className="new-crop-form">
            <h2>Add New Crop</h2>
            <div className="new-crop-form-row">
                <label htmlFor="newCropName">Name</label>
                <input id="newCropName" type="text" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropPlantDate">Plant date</label>
                <input id="newCropPlantDate" type="date" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropGermDays">Days to germination</label>
                <input id="newCropGermDays" type="number" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropHarvDays">Days to harvest</label>
                <input id="newCropHarvDays" type="number" required />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropPlantDepth">Planting depth</label>
                <input id="newCropPlantDepth" type="number" step=".01" />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropRowSpace">Row spacing</label>
                <input id="newCropRowSpace" type="number" step=".01" />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropSeedSpace">Seed spacing</label>
                <input id="newCropSeedSpace" type="number" step=".01" />
            </div>
            <input type="submit" />
            <button onClick={cancelNewCrop}>Cancel</button>
        </form>
    );
}

GardenPlotNewForm.propTypes = {
    history: PropTypes.object
};