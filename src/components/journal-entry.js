import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJournalEntry, editJournalEntry, saveJournalEntry, cancelEditJournalEntry, addError } from "../actions";
import { makeISODate, extractFormValues, queryServer, makeDateFromISOString } from "../utilities";

import "./journal-entry.css";

export function JournalEntry(props) {
    function save(e) {
        e.preventDefault();

        const newValues = extractFormValues(e.target.elements, { id: props.id });
        props.save(props.id, props.authToken, newValues);
        props.cancel();
    }

    const date = makeDateFromISOString(new Date(props.date).toISOString());
    
    if (props.status !== "editing") {
        return (
            <div className="journal-entry">
                <span className="journal-date" onClick={() => props.edit(props.id)}>{date}</span>
                <span className="journal-scope" onClick={() => props.edit(props.id)}>{props.scope}</span>
                <span className="journal-note" onClick={() => props.edit(props.id)}>{props.text}</span>
                <span className="journal-opts x" onClick={() => props.delete(props.id, props.authToken)}>x</span>
            </div>
        );
    } else {
        return (
            <form onSubmit={save} className="journal-entry-edit">
                <input className="journal-date" type="date" name="date" defaultValue={makeISODate(props.date)} />
                <span className="journal-scope">{props.scope}</span>
                <textarea className="journal-note" name="text" defaultValue={props.text} />
                <button className="journal-cancel" type="button" onClick={() => props.cancel()}>Cancel</button>
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
    dispatch: PropTypes.func,
    cancel: PropTypes.func,
    edit: PropTypes.func,
    delete: PropTypes.func,
    save: PropTypes.func
}

const mapStateToProps = state => ({
    authToken: state.authToken
});

const mapDispatchToProps = dispatch => ({
    delete: (id, authToken) => {
        queryServer("DELETE", `journal/${id}`, authToken)
            .then(() => dispatch(deleteJournalEntry(id)))
            .catch(err => dispatch(addError(err.code, err.message)));
    },

    cancel: () => {
        dispatch(cancelEditJournalEntry());
    },

    edit: (id) => {
        dispatch(editJournalEntry(id));
    },

    save: (id, authToken, newValues) => {
        queryServer("PUT", `journal/${id}`, authToken, newValues)
            .then(() => dispatch(saveJournalEntry(newValues)))
            .catch(err => dispatch(addError(err.code, err.message)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalEntry);