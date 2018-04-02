import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { Link } from "react-router-dom";

import { GardenPlot } from './garden-plot';
import { makeISODate, makeDateFromISOString } from "../utilities";

describe("<GardenPlot />", () => {
    let crop;

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
        }
    });

    it("Renders without crashing", () => {
        const wrapper = shallow(<GardenPlot info={crop} />);
        expect(wrapper.find("div.garden-plot")).toHaveLength(1);
    });

    it("Should dispatch action on delete", () => {
        const deleteCard = jest.fn();
        const wrapper = shallow(<GardenPlot info={crop} authToken={"Abcd"} deleteCard={deleteCard} />);
        wrapper.find(".x").simulate("click");
        
        expect(deleteCard).toHaveBeenCalledWith(crop.id, "Abcd");
    });
});