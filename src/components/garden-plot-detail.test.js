import React from 'react';
import { shallow, mount } from 'enzyme';

import { GardenPlotDetails } from './garden-plot-detail';
import { makeISODate, makeDateFromISOString } from "../utilities";

describe("<GardenPlotDetail />", () => {
    let crop;
    let match = { params: { id: "Abc" } };

    beforeEach(() => {
        crop = {
            id: "Abc",
            name: "Tomato",
            variety: "Heirloom",
            plant_date: makeISODate(makeDateFromISOString((new Date("03/14/2018")).toISOString())),
            germination_days: "10",
            harvest_days: "20",
            planting_depth: "1.2",
            row_spacing: "1.3",
            seed_spacing: "1.4",
            status: "viewing"
        };
    });

    it("Renders without crashing", () => {
        const wrapper = shallow(<GardenPlotDetails crop={crop} match={match} />);
        expect(wrapper.find("div.garden-plot-detail")).toHaveLength(1);
    });

    it("Should render an edit form", () => {
        crop.status = "editing";
        const wrapper = mount(<GardenPlotDetails crop={crop} authToken={""} match={match} />);
        
        expect(wrapper.find("form.garden-plot-detail")).toHaveLength(1);
        expect(wrapper.find("input[name='name']").instance().value).toEqual(crop.name);
        expect(wrapper.find("input[name='variety']").instance().value).toEqual(crop.variety);
        expect(wrapper.find("input[name='plant_date']").instance().value).toEqual(crop.plant_date);
        expect(wrapper.find("input[name='germination_days']").instance().value).toEqual(crop.germination_days);
        expect(wrapper.find("input[name='harvest_days']").instance().value).toEqual(crop.harvest_days);
        expect(wrapper.find("input[name='planting_depth']").instance().value).toEqual(crop.planting_depth);
        expect(wrapper.find("input[name='row_spacing']").instance().value).toEqual(crop.row_spacing);
        expect(wrapper.find("input[name='seed_spacing']").instance().value).toEqual(crop.seed_spacing);
    });

    it("Should dispatch action to edit crop", () =>{
        const dummy = jest.fn();
        const editEntry = jest.fn();

        const wrapper = mount(<GardenPlotDetails crop={crop} authToken={""} match={match} dispatch={dummy} saveChanges={dummy} cancel={dummy} editEntry={editEntry} />);
        wrapper.find(".growing-group").childAt(1).simulate("click");

        expect(editEntry).toHaveBeenCalledWith(crop.id);
        expect(dummy).not.toHaveBeenCalled();
    });

    it("Should dispatch action to cancel crop", () => {
        crop.status = "editing";

        const dummy = jest.fn();
        const cancel = jest.fn();

        const wrapper = mount(<GardenPlotDetails crop={crop} authToken={""} match={match} dispatch={dummy} saveChanges={dummy} cancel={cancel} editEntry={dummy} />);
        wrapper.find("button.form-btn").simulate("click");

        expect(cancel).toHaveBeenCalledWith();
        expect(dummy).not.toHaveBeenCalled();
    });

    it("Should dispatch actions to save edited crop", () => {
        crop.status = "editing";
        const {
            germination_days,
            harvest_days,
            id,
            name,
            plant_date,
            variety,
            planting_depth,
            row_spacing,
            seed_spacing
        } = crop;
        const newCrop = {
            germination_days,
            harvest_days,
            id,
            name,
            plant_date,
            variety,
            planting_depth,
            row_spacing,
            seed_spacing
        };

        const saveChanges = jest.fn();
        const cancel = jest.fn();
        const dummy = jest.fn();

        const wrapper = mount(<GardenPlotDetails crop={crop} authToken={"abcd"} match={match} dispatch={dummy} saveChanges={saveChanges} cancel={cancel} editEntry={dummy} />);
        wrapper.simulate("submit");

        expect(saveChanges).toHaveBeenCalledWith(crop.id, "abcd", newCrop);
        expect(cancel).toHaveBeenCalled();
        expect(dummy).not.toHaveBeenCalled();
    });
});