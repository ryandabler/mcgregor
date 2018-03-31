import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteCrop, addError } from "../actions";
import { queryServer, makeDateFromISOString } from "../utilities";

import "./garden-plot.css";

export function GardenPlot(props) {
    const date = makeDateFromISOString(new Date(props.info.plant_date).toISOString());

    return (
        <div className="garden-plot">
            <span onClick={() => props.deleteCard(props.info.id, props.authToken)} className="x">x</span>
            <Link className="plain-link" to={`/garden/${props.info.id}`}>
                <h2>{props.info.name}</h2>
                <h3 className="variety">{props.info.variety}</h3>
                <div className="garden-plot-info">
                    <span>Plant date</span>
                    <span>{date}</span>
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
    dispatch: PropTypes.func,
    deleteCard: PropTypes.func
}

const mapStateToProps = state => ({
    authToken: state.authToken
});

const mapDispatchToProps = dispatch => ({
    deleteCard: (cropId, authToken) => {
        queryServer("DELETE", `crops/${cropId}`, authToken)
            .then(() => dispatch(deleteCrop(cropId)))
            .catch(err => dispatch(addError(err.code, err.message)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GardenPlot);