import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJournalEntry, editJournalEntry, saveJournalEntry, cancelEditJournalEntry } from "../actions";
import { makeISODate, extractFormValues, queryServer } from "../utilities";

import "./journal-entry.css";

export function JournalEntry(props) {
    function deleteEntry() {
        queryServer("DELETE", `journal/${props.id}`, props.authToken)
            .then(() => props.dispatch(deleteJournalEntry(props.id)));
    }

    function cancel() {
        props.dispatch(cancelEditJournalEntry());
    }

    function editEntry() {
        props.dispatch(editJournalEntry(props.id));
    }

    function save(e) {
        e.preventDefault();

        const newValues = extractFormValues(e.target.elements, { id: props.id });
        queryServer("PUT", `journal/${props.id}`, props.authToken, newValues)
            .then(() => props.dispatch(saveJournalEntry(newValues)));

        cancel();
    }

    const date = new Date(props.date);

    if (props.status !== "editing") {
        return (
            <div className="journal-entry">
                <span className="journal-date" onClick={editEntry}>{date.toLocaleDateString()}</span>
                <span className="journal-scope" onClick={editEntry}>{props.scope}</span>
                <span className="journal-note" onClick={editEntry}>{props.text}</span>
                <span className="journal-opts x" onClick={deleteEntry}>x</span>
            </div>
        );
    } else {
        return (
            <form onSubmit={save} className="journal-entry-edit">
                <input className="journal-date" type="date" name="date" defaultValue={makeISODate(props.date)} />
                <span className="journal-scope">{props.scope}</span>
                <textarea className="journal-note" name="text" defaultValue={props.text} />
                <button className="journal-cancel x" type="button" onClick={cancel}>Cancel</button>
                <input className="journal-save" type="submit" value="Save" />
            </form>
        );
    }
}

JournalEntry.propTypes = {
    date: PropTypes.string,
    scope: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    authToken: PropTypes.string,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    authToken: state.authToken
});

export default connect(mapStateToProps)(JournalEntry);