import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addNewCrop, addError } from "../actions";
import { extractFormValues, queryServer } from "../utilities";

import "./garden-plot-new-form.css";

export function GardenPlotNewForm(props) {
    function cancelNewCrop(e) {
        e.preventDefault();
        props.history.push("./");
    }

    function createNewCrop(e) {
        e.preventDefault();

        const cropValues = extractFormValues(e.target.elements);
        props.saveChanges(props.authToken, cropValues);
        props.history.push("./");
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
                <label htmlFor="newCropPlantDepth">Planting depth (in.)</label>
                <input id="newCropPlantDepth" name="planting_depth" type="number" step=".01" />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropRowSpace">Row spacing (in.)</label>
                <input id="newCropRowSpace" name="row_spacing" type="number" step=".01" />
            </div>
            <div className="new-crop-form-row">
                <label htmlFor="newCropSeedSpace">Seed spacing (in.)</label>
                <input id="newCropSeedSpace" name="seed_spacing" type="number" step=".01" />
            </div>
            <input type="submit" />
            <button className="form-btn" onClick={cancelNewCrop}>Cancel</button>
        </form>
    );
}

GardenPlotNewForm.propTypes = {
    history: PropTypes.object,
    authToken: PropTypes.string,
    dispatch: PropTypes.func,
    saveChanges: PropTypes.func
};

const mapStateToProps = state => ({
    authToken: state.authToken
});

const mapDispatchToProps = dispatch => ({
    saveChanges: (authToken, cropValues) => {
        queryServer("POST", "crops", authToken, cropValues)
            .then(res => res.json())
            .then(crop => dispatch(addNewCrop(crop)))
            .catch(err => dispatch(addError(err.code, err.message)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GardenPlotNewForm);