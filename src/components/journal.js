import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JournalYear from "./journal-year";
import { createJournalEntry } from "../actions";
import { getJournalYears, getJournalEntriesByYear, sortJournalByDate } from "../utilities";

import "./journal.css";

export function Journal(props) {
    function toggleDisplay(year) {
        const journals = Array.from(document.getElementsByClassName("journal-year"));
        journals.forEach(journal => {
            if (journal.getElementsByClassName("journal-header")[0].getAttribute("data-year") === year.toString()) {
                journal.getElementsByClassName("journal-entries")[0].classList.toggle("hidden");
            } else {
                journal.getElementsByClassName("journal-entries")[0].classList.add("hidden");
            }
        })
    }

    function createNewEntry(e) {
        e.preventDefault();

        const jeValues = { scope: props.scope};
        Object.keys(e.target.elements).forEach(key => {
            const name = e.target.elements[key].name;
            if (name) jeValues[name] = e.target.elements[key].value;
        });

        e.target.reset();
        props.dispatch(createJournalEntry(jeValues));

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
    
    return (
        <div className="journal">
            <form onSubmit={createNewEntry} className="new-entry">
                <div className="new-entry-group new-date">
                    <label htmlFor="new-entry-date">Date</label>
                    <input id="new-entry-date" name="date" type="date" />
                </div>
                <div className="new-entry-group new-text">
                    <label htmlFor="new-entry-text">Note</label>
                    <input id="new-entry-text" name="text" type="text" />
                </div>
                <div className="cmd-btns">
                    <input type="submit" value="Save" />
                    <button onClick={clearForm} type="button">Clear</button>
                </div>
            </form>
            {groups}
        </div>
    );
}

Journal.propTypes = {
    entries: PropTypes.array,
    filter: PropTypes.string,
    dispatch: PropTypes.func,
    scope: PropTypes.string
}

const mapStateToProps = (state, props) => {
    const entries = props.filter ? 
        state.garden.journal.filter(entry => entry.scope === props.filter) :
        state.garden.journal; 
    return {
        entries
    }
};

export default connect(mapStateToProps)(Journal);