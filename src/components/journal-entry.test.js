import React from 'react';
import { shallow, mount } from 'enzyme';

import { JournalEntry } from './journal-entry';
import { makeISODate, makeDateFromISOString } from "../utilities";

describe("<JournalEntry />", () => {
    let entry;

    beforeEach(() => {
        entry = {
            id: "abc",
            status: "viewing",
            date: makeISODate(makeDateFromISOString()),
            scope: "",
            text: "Test entry"
        };
    });

    it("Renders without crashing", () => {
        const wrapper = shallow(<JournalEntry date={entry.date} />);

        expect(wrapper.find("div.journal-entry")).toHaveLength(1);
    });

    it("Should render an edit form", () => {
        entry.status = "editing";
        const wrapper = mount(<JournalEntry status={entry.status} date={entry.date} text={entry.text} scope={entry.scope} />);
        
        expect(wrapper.find("form.journal-entry-edit")).toHaveLength(1);
        expect(wrapper.find("input[name='date']").instance().value).toEqual(entry.date);
        expect(wrapper.find("textarea[name='text']").instance().value).toEqual(entry.text);
    });

    it("Should dispatch action to delete entry", () => {
        const deleteFn = jest.fn();
        const wrapper = mount(<JournalEntry id={entry.id} authToken={"ABCD"} status={entry.status} date={entry.date} delete={deleteFn} />);
        wrapper.find(".x").simulate("click");

        expect(deleteFn).toHaveBeenCalledWith(entry.id, "ABCD");
    });

    it("Should dispatch action to edit entry", () => {
        const edit = jest.fn();
        const wrapper = mount(<JournalEntry id={entry.id} authToken={"ABCD"} status={entry.status} date={entry.date} edit={edit} />);
        wrapper.find(".journal-date").simulate("click");

        expect(edit).toHaveBeenCalledWith(entry.id);
    });

    it("Should dispatch action to cancel edit", () => {
        entry.status = "editing";

        const cancel = jest.fn();
        const wrapper = mount(<JournalEntry id={entry.id} authToken={"ABCD"} status={entry.status} date={entry.date} cancel={cancel} />);
        wrapper.find(".journal-cancel").simulate("click");

        expect(cancel).toHaveBeenCalled();
    });

    it("Should dispatch action to save entry", () => {
        entry.status = "editing";
        
        const {
            id,
            text,
            date
        } = entry;
        const newEntry = { id, text, date };
        
        const cancel = jest.fn();
        const save = jest.fn();
        const wrapper = mount(<JournalEntry id={entry.id} authToken={"ABCD"} status={entry.status} date={entry.date} text={entry.text} cancel={cancel} save={save} />);
        wrapper.simulate("submit");
        
        expect(save).toHaveBeenCalledWith(entry.id, "ABCD", newEntry);
        expect(cancel).toHaveBeenCalled();
    });
});