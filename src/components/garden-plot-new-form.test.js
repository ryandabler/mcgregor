import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history';

import { GardenPlotNewForm } from './garden-plot-new-form';

describe("<GardenPlotNewForm />", () => {
    it("Renders without crashing", () => {
        const wrapper = shallow(<GardenPlotNewForm />);
        expect(wrapper.find("form.new-crop-form")).toHaveLength(1);
    });

    it("Should go up a directory when canceling", () => {
        const history = createMemoryHistory({
            initialEntries: [ "/garden/new" ]
        });
        
        const wrapper = mount(<GardenPlotNewForm authToken={"Abcd"} history={history} />);
        wrapper.find("button.form-btn").simulate("click");
        
        expect(history.entries[history.index].pathname).toEqual("/garden/");
    });

    it("Should dispatch action to save crop and go up a directory", () => {
        const crop = {
            name: "Tomato",
            variety: "Variety",
            plant_date: "2018-03-29",
            germination_days: "1",
            harvest_days: "2",
            planting_depth: ".01",
            row_spacing: "",
            seed_spacing: ""
        };
        const history = createMemoryHistory({
            initialEntries: [ "/garden/new" ]
        });
        const saveChanges = jest.fn();

        const wrapper = mount(<GardenPlotNewForm authToken={"Abcd"} history={history} saveChanges={saveChanges} />);
        wrapper.find("#newCropName").instance().value = crop.name;
        wrapper.find("#newCropVariety").instance().value = crop.variety;
        wrapper.find("#newCropPlantDate").instance().value = crop.plant_date;
        wrapper.find("#newCropGermDays").instance().value = crop.germination_days;
        wrapper.find("#newCropHarvDays").instance().value = crop.harvest_days;
        wrapper.find("#newCropPlantDepth").instance().value = crop.planting_depth;
        wrapper.find("form").simulate("submit");
        
        expect(saveChanges).toHaveBeenCalledWith("Abcd", crop);
        expect(history.entries[history.index].pathname).toEqual("/garden/");
    });
});