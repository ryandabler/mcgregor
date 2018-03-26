import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJournalEntry, editJournalEntry, saveJournalEntry, cancelEditJournalEntry } from "../actions";
import { makeISODate, extractFormValues, normalizeResponseErrors } from "../utilities";
import { API_BASE_URL } from "../config";

import "./journal-entry.css";

export function JournalEntry(props) {
    function deleteEntry() {
        fetch(`${API_BASE_URL}/api/journal/${props.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${props.authToken}`
            }
        })
        .then(res => normalizeResponseErrors(res))
        .then(() => props.dispatch(deleteJournalEntry(props.id)))
        .catch(err => console.log(err));
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

        fetch(`${API_BASE_URL}/api/journal/${props.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.authToken}`
            },
            body: JSON.stringify(newValues)
        })
        .then(res => normalizeResponseErrors(res))
        .then(() => props.dispatch(saveJournalEntry(newValues)))
        .catch(err => console.log(err));

        cancel();
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
            <form onSubmit={save} className="journal-entry">
                <input type="date" name="date" defaultValue={makeISODate(props.date)} />
                <span>{props.scope}</span>
                <input type="text" name="text" defaultValue={props.text} />
                <button type="button" onClick={cancel} className="x">x</button>
                <input type="submit" value="Save" />
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