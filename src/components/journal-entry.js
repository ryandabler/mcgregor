import React from "react";
import PropTypes from "prop-types";

import "./journal-entry.css";

export default function JournalEntry(props) {
    return (
        <div className="journal-entry">
            <span>{props.date}</span>
            <span>{props.scope}</span>
            <span>{props.text}</span>
        </div>
    );
}

JournalEntry.propTypes = {
    date: PropTypes.string,
    scope: PropTypes.string,
    text: PropTypes.string
}