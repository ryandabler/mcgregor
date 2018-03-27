import React from "react";
import PropTypes from "prop-types";
import JournalEntry from "./journal-entry";

import "./journal-year.css";

export default function JournalYear(props) {
    const entries = props.entries.map(entry => <JournalEntry key={entry.id}
                                                             id={entry.id}
                                                             status={entry.status}
                                                             date={entry.date}
                                                             scope={entry.scope}
                                                             text={entry.text} />);

    return (
        <div className="journal-year">
            <h3 onClick={() => props.toggle(props.year)} data-year={props.year} className="journal-header">
                {props.year}
            </h3>
            <div className="journal-entries">
                {entries}
            </div>
        </div>
    );
}

JournalYear.propTypes = {
    year: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.object),
    toggle: PropTypes.func
}