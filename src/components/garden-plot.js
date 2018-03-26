import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteCrop } from "../actions";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../utilities";

import "./garden-plot.css";

export function GardenPlot(props) {
    function deleteCard() {
        fetch(`${API_BASE_URL}/api/crops/${props.info.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${props.authToken}`
            }
        })
        .then(res => normalizeResponseErrors(res))
        .then(() => props.dispatch(deleteCrop(props.info.id)))
        .catch(err => console.log(err));
    }

    const date = new Date(props.info.plant_date);

    return (
        <div className="garden-plot">
            <span onClick={deleteCard} className="x">x</span>
            <Link className="plain-link" to={`/garden/${props.info.id}`}>
                <h2>{props.info.name}</h2>
                <div className="garden-plot-info">
                    <span>Plant date</span>
                    <span>{date.toLocaleDateString()}</span>
                </div>
                <div className="garden-plot-info">
                    <span>Germination days</span>
                    <span>{props.info.germination_days}</span>
                </div>
                <div className="garden-plot-info">
                    <span>Harvest days</span>
                    <span>{props.info.harvest_days}</span>
                </div>
            </Link>
        </div>
    );
}

GardenPlot.propTypes = {
    info: PropTypes.object,
    authToken: PropTypes.string,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    authToken: state.authToken
});

export default connect(mapStateToProps)(GardenPlot);