import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JournalYear from "./journal-year";
import { createJournalEntry } from "../actions";
import { API_BASE_URL } from "../config";
import {
    getJournalYears,
    getJournalEntriesByYear,
    sortJournalByDate,
    extractFormValues,
    normalizeResponseErrors
} from "../utilities";

import "./journal.css";

export function Journal(props) {
    function toggleDisplay(year) {
        const journals = Array.from(document.getElementsByClassName("journal-header"));
        journals.forEach(journal => {
            if (journal.getAttribute("data-year") === year.toString()) {
                journal.nextElementSibling.classList.toggle("hidden");
            } else {
                journal.nextElementSibling.classList.add("hidden");
            }
        })
    }

    function createNewEntry(e) {
        e.preventDefault();

        const jeValues = extractFormValues(e.target.elements, { scope: props.scope });
        
        fetch(`${API_BASE_URL}/api/journal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.authToken}`
            },
            body: JSON.stringify(jeValues)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(journal => props.dispatch(createJournalEntry(journal)))
        .catch(err => console.log(err));

        e.target.reset();
    }

    function clearForm(e) {
        const form = e.target.parentElement.parentElement;
        form.reset();
    }

    const years = getJournalYears(props.entries);
    const journalByYear = years.map(year => 
        sortJournalByDate(getJournalEntriesByYear(props.entries, year))
    );
    const groups = years.map((year, idx) => <JournalYear key={year}
                                                         year={year}
                                                         entries={journalByYear[idx]}
                                                         toggle={toggleDisplay} />);
    
    const today = (new Date()).toISOString().split("T")[0];
    return (
        <section className="journal">
            <h3 onClick={() => toggleDisplay("new")} data-year="new" className="journal-header accordion-indicator">
                New Note
            </h3>
            <form onSubmit={createNewEntry} className="new-entry">
                <div className="new-entry-group new-date">
                    <label htmlFor="new-entry-date">Date</label>
                    <input id="new-entry-date" name="date" type="date" defaultValue={today} />
                </div>
                <div className="new-entry-group new-text">
                    <label htmlFor="new-entry-text">Note</label>
                    <textarea id="new-entry-text" name="text" />
                </div>
                <div className="cmd-btns">
                    <input type="submit" value="Save" />
                    <button onClick={clearForm} type="button">Clear</button>
                </div>
            </form>
            {groups}
        </section>
    );
}

Journal.propTypes = {
    entries: PropTypes.array,
    filter: PropTypes.string,
    dispatch: PropTypes.func,
    scope: PropTypes.string,
    authToken: PropTypes.string
}

const mapStateToProps = (state, props) => {
    const entries = props.filter ? 
        state.journal.filter(entry => entry.scope === props.filter) :
        state.journal; 
    return {
        entries,
        authToken: state.authToken
    };
};

export default connect(mapStateToProps)(Journal);