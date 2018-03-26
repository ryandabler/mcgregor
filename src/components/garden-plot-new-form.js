import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addNewCrop } from "../actions";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors, extractFormValues } from "../utilities";

import "./garden-plot-new-form.css";

export function GardenPlotNewForm(props) {
    function cancelNewCrop(e) {
        e.preventDefault();
        props.history.push("./");
    }

    function createNewCrop(e) {
        e.preventDefault();

        const cropValues = extractFormValues(e.target.elements);
        
        fetch(`${API_BASE_URL}/api/crops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.authToken}`
            },
            body: JSON.stringify(cropValues)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(crop => {
            props.dispatch(addNewCrop(crop));
        })
        .catch(err => console.log(err));
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
                <label htmlFor="newCropVariety">Variety</label>
                <input id="newCropVariety" name="variety" type="text" required />
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
    authToken: PropTypes.string,
    dispatch: PropTypes.func
};

const mapStateToProps = state => ({
    authToken: state.authToken
});

export default connect(mapStateToProps)(GardenPlotNewForm);