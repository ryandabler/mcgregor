import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import ErrorMsg from "./error-msg";
import { deleteError } from "../actions";

import "./error-container.css";

export function ErrorContainer(props) {
    const errors = props.errors.map(error =>
        <ErrorMsg key={error.id} id={error.id} message={error.message} delete={props.delete} />
    );
    
    return (
        <ul className="error-container">
            {errors}
        </ul>
    );
}

ErrorContainer.propTypes = {
    errors: PropTypes.array,
    delete: PropTypes.func
}

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    delete: (id) => dispatch(deleteError(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);