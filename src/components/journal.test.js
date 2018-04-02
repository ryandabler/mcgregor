import React from 'react';
import { shallow } from 'enzyme';

import { Journal } from './journal';
import { makeISODate, makeDateFromISOString, getJournalYears } from "../utilities";

describe("<Journal />", () => {
    let entries;

    beforeEach(() => {
        entries = [{
            id: "abc",
            status: "viewing",
            date: makeISODate(makeDateFromISOString()),
            scope: "",
            text: "Test entry"
        }, {
            id: "def",
            status: "viewing",
            date: makeISODate(makeDateFromISOString()),
            scope: "",
            text: "Test entry 2"
        }];
    });

    it("Renders without crashing", () => {
        const wrapper = shallow(<Journal entries={entries} />);

        expect(wrapper.find("section.journal")).toHaveLength(1);
    });

    it("Should render entries into groups by year", () => {
        const years = getJournalYears(entries);

        const wrapper = shallow(<Journal entries={entries} />);
        
        expect(wrapper.find("section.journal").children()).toHaveLength(2 + years.length);
    });

    it("Should create new entry", () => {
        const newEntry = { date: "2018-03-30", text: "Test text 3" };
        const save = jest.fn();

        // Must create custom event object because shallow rendering doesn't capture events
        // like mount does. Can't mount() Journal because JournalEntry requires a store
        // to capture authToken
        const e = {
            preventDefault() {},
            target: {
                reset() {},
                elements: {
                    date: {
                        name: "date",
                        value: newEntry.date
                    },

                    text: {
                        name: "text",
                        value: newEntry.text
                    }
                }
            }
        }

        const wrapper = shallow(<Journal entries={entries} save={save} authToken={"ABCD"} />);
        wrapper.find("input[name='date']").value = newEntry.date;
        wrapper.find("textarea").value = newEntry.text;
        wrapper.find("form.new-entry").simulate("submit", e);
        
        expect(save).toHaveBeenCalledWith("ABCD", newEntry);
    });
});