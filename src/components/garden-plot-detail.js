import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { editCrop, cancelEditCrop, saveCrop, addError } from "../actions";
import { makeISODate, extractFormValues, queryServer, makeDateFromISOString } from "../utilities";

import "./garden-plot-detail.css";

export function GardenPlotDetails(props) {
    function save(e) {
        e.preventDefault();

        const newValues = extractFormValues(e.target.elements, { id: props.match.params.id });
        props.saveChanges(props.match.params.id, props.authToken, newValues);

        props.cancel();
    }

    const plant_date = makeDateFromISOString(new Date(props.crop.plant_date).toISOString());
    if (props.crop.status === "editing") {
        return (
            <div>
                <form onSubmit={save} className="garden-plot-detail">
                    <h2>
                        <input type="text" name="name" className="center-input" defaultValue={props.crop.name} />
                        <input type="text" name="variety" className="center-input" defaultValue={props.crop.variety} />
                    </h2>
                    <h3>Grow information</h3>
                    <div className="grid group growing-group">
                        <span>Plant date</span>
                        <input type="date" name="plant_date" defaultValue={makeISODate(plant_date)} />
                        <span>Days to germination</span>
                        <input type="number" name="germination_days" defaultValue={props.crop.germination_days} />
                        <span>Days to harvest</span>
                        <input type="number" name="harvest_days" defaultValue={props.crop.harvest_days} />
                    </div>
                    <h3>Planting information</h3>
                    <div className="grid group planting-group">
                        <span>Planting depth (in.)</span>
                        <input type="number" name="planting_depth" step=".01" defaultValue={props.crop.planting_depth} />
                        <span>Row spacing (in.)</span>
                        <input type="number" name="row_spacing" step=".01"  defaultValue={props.crop.row_spacing} />
                        <span>Seed spacing (in.)</span>
                        <input type="number" name="seed_spacing" step=".01"  defaultValue={props.crop.seed_spacing} />
                    </div>
                    <div className="edit-crop-form-row">
                        <input type="submit" className="buttonize" value="Save" />
                        <button type="button" className="form-btn buttonize" onClick={() => props.cancel()}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <div className="garden-plot-detail">
                    <h2>
                        {props.crop.name}
                        <span className="variety">{props.crop.variety}</span>
                    </h2>
                    <h3>Grow information</h3>
                    <div className="grid group growing-group">
                        <span>Plant date</span>
                        <span onClick={() => props.editEntry(props.match.params.id)}>{plant_date}</span>
                        <span>Days to germination</span>
                        <span onClick={() => props.editEntry(props.match.params.id)}>{props.crop.germination_days}</span>
                        <span>Days to harvest</span>
                        <span onClick={() => props.editEntry(props.match.params.id)}>{props.crop.harvest_days}</span>
                    </div>
                    <h3>Planting information</h3>
                    <div className="grid group planting-group">
                        <span>Planting depth (in.)</span>
                        <span onClick={() => props.editEntry(props.match.params.id)}>{props.crop.planting_depth}</span>
                        <span>Row spacing (in.)</span>
                        <span onClick={() => props.editEntry(props.match.params.id)}>{props.crop.row_spacing}</span>
                        <span>Seed spacing (in.)</span>
                        <span onClick={() => props.editEntry(props.match.params.id)}>{props.crop.seed_spacing}</span>
                    </div>
                </div>
                <div className="btn-ctrlr">
                    <button className="back-btn buttonize">Back</button>
                </div>
            </div>
    )}
}

GardenPlotDetails.propTypes = {
    crop: PropTypes.object,
    match: PropTypes.object,
    authToken: PropTypes.string,
    saveChanges: PropTypes.func,
    editEntry: PropTypes.func,
    cancel: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveChanges: (cropId, authToken, cropValues) => {
            queryServer("PUT", `crops/${cropId}`, authToken, cropValues)
                .then(() => dispatch(saveCrop(cropValues)))
                .catch(err => dispatch(addError(err.code, err.message)))
        },
        editEntry: (cropId) => {
            dispatch(editCrop(cropId));
        },
        cancel: () => {
            dispatch(cancelEditCrop())
        }
    }
}

const mapStateToProps = (state, props) => {
    const crop = state.garden.crops.find(crop => crop.id === props.match.params.id);
    return {
        crop,
        status: crop.status,
        authToken: state.authToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GardenPlotDetails);