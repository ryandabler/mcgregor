import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JournalEntry from "./journal-entry";

import "./journal.css";

export function Journal(props) {
    const entries = props.entries.map(entry => <JournalEntry key={entry.id} 
                                                             date={entry.date}
                                                             scope={entry.scope}
                                                             text={entry.text} />);
    return (
        <div className="journal">
            {entries}
        </div>
    );
}

Journal.propTypes = {
    entries: PropTypes.array
}

const mapStateToProps = state => ({
    entries: state.garden.journal
});

export default connect(mapStateToProps)(Journal);