import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJournalEntry, editJournalEntry, saveJournalEntry, cancelEditJournalEntry } from "../actions";
import { makeISODate } from "../utilities";

import "./journal-entry.css";

export function JournalEntry(props) {
    function deleteEntry() {
        props.dispatch(deleteJournalEntry(props.id));
    }

    function cancel() {
        props.dispatch(cancelEditJournalEntry());
    }

    function editEntry() {
        props.dispatch(editJournalEntry(props.id));
    }

    function save(e) {
        e.preventDefault();

        const newValues = { id: props.id };
        Object.keys(e.target.elements).forEach(key => {
            const name = e.target.elements[key].name;
            if (name) newValues[name] = e.target.elements[key].value;
        });

        cancel();
        props.dispatch(saveJournalEntry(newValues));
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
    dispatch: PropTypes.func
}

export default connect()(JournalEntry);