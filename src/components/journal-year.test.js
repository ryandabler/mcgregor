import React from 'react';
import { shallow } from 'enzyme';

import JournalYear from './journal-year';
import { makeISODate, makeDateFromISOString } from "../utilities";

describe("<JournalYear />", () => {
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
        const wrapper = shallow(<JournalYear entries={entries} />);

        expect(wrapper.find("div.journal-year")).toHaveLength(1);
    });

    it("Should call toggle function when header is clicked", () => {
        const toggle = jest.fn();
        const year = 2018;

        const wrapper = shallow(<JournalYear entries={entries} toggle={toggle} year={year} />);
        wrapper.find(".journal-header").simulate("click");

        expect(toggle).toHaveBeenCalledWith(year);
    });

    it("Should render individual journal entries", () => {
        const wrapper = shallow(<JournalYear entries={entries} year={2018} />);

        expect(wrapper.find(".journal-entries").children()).toHaveLength(entries.length);
    });
});