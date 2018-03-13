import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JournalYear from "./journal-year";
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
            {groups}
        </div>
    );
}

Journal.propTypes = {
    entries: PropTypes.array,
    filter: PropTypes.string
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