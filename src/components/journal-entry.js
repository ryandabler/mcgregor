import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJournalEntry, editJournalEntry, cancelEditJournalEntry } from "../actions";
import { makeISODate } from "../utilities";

import "./journal-entry.css";

export function JournalEntry(props) {
    function deleteEntry() {
        props.dispatch(deleteJournalEntry(props.id));
    }

    function cancelEditing() {
        props.dispatch(cancelEditJournalEntry());
    }

    function editEntry() {
        props.dispatch(editJournalEntry(props.id));
    }

    if (props.status !== "editing") {
        return (
            <div className="journal-entry">
                <span onClick={editEntry}>{props.date}</span>
                <span onClick={editEntry}>{props.scope}</span>
                <span onClick={editEntry}>{props.text}</span>
                <span onClick={deleteEntry} className="x">x</span>
            </div>
        );
    } else {
        return (
            <div className="journal-entry">
                <input type="date" defaultValue={makeISODate(props.date)} />
                <span>{props.scope}</span>
                <input type="text" defaultValue={props.text} />
                <span onClick={cancelEditing} className="x">x</span>
            </div>
        );
    }
}

JournalEntry.propTypes = {
    date: PropTypes.string,
    scope: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    dispatch: PropTypes.func
}

export default connect()(JournalEntry);