import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Journal from "./journal.js";
import { editCrop, cancelEditCrop, saveCrop } from "../actions";
import { makeISODate, extractFormValues, queryServer } from "../utilities";

import "./garden-plot-detail.css";

export function GardenPlotDetails(props) {
    function editEntry() {
        props.dispatch(editCrop(props.match.params.id));
    }
    
    function cancel() {
        props.dispatch(cancelEditCrop());
    }

    function save(e) {
        e.preventDefault();

        const newValues = extractFormValues(e.target.elements, { id: props.match.params.id });
        
        queryServer("PUT", `crops/${props.match.params.id}`, props.authToken, newValues)
            .then(() => props.dispatch(saveCrop(newValues)));

        cancel();
    }

    const plant_date = (new Date(props.crop.plant_date)).toLocaleDateString().split("T")[0];
    
    if (props.crop.status === "editing") {
        return (
            <form onSubmit={save} className="garden-plot-detail">
                <h2>
                    <input type="text" name="name" defaultValue={props.crop.name} />
                    <input type="text" name="variety" defaultValue={props.crop.variety} />
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
                <input type="submit" value="Save" />
                <button type="button" className="form-btn" onClick={cancel}>Cancel</button>
            </form>
        );
    } else {
        return (
            <div className="garden-plot-detail">
                <h2>
                    {props.crop.name}
                    <span className="variety">{props.crop.variety}</span>
                </h2>
                <h3>Grow information</h3>
                <div className="grid group growing-group">
                    <span>Plant date</span>
                    <span onClick={editEntry}>{plant_date}</span>
                    <span>Days to germination</span>
                    <span onClick={editEntry}>{props.crop.germination_days}</span>
                    <span>Days to harvest</span>
                    <span onClick={editEntry}>{props.crop.harvest_days}</span>
                </div>
                <h3>Planting information</h3>
                <div className="grid group planting-group">
                    <span>Planting depth (in.)</span>
                    <span onClick={editEntry}>{props.crop.planting_depth}</span>
                    <span>Row spacing (in.)</span>
                    <span onClick={editEntry}>{props.crop.row_spacing}</span>
                    <span>Seed spacing (in.)</span>
                    <span onClick={editEntry}>{props.crop.seed_spacing}</span>
                </div>
                <h3>Journal</h3>
                <Journal scope={props.match.params.id} filter={props.match.params.id} />
            </div>
    )}
}

GardenPlotDetails.propTypes = {
    crop: PropTypes.object,
    match: PropTypes.object,
    authToken: PropTypes.string,
    dispatch: PropTypes.func
}

const mapStateToProps = (state, props) => {
    const crop = state.garden.crops.find(crop => crop.id === props.match.params.id);
    return {
        crop,
        status: crop.status,
        authToken: state.authToken
    };
};

export default connect(mapStateToProps)(GardenPlotDetails);