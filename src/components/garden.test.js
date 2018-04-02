import React from 'react';
import { shallow } from 'enzyme';

import { Garden } from './garden';
import { makeISODate, makeDateFromISOString } from "../utilities";

describe("<Garden />", () => {
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
        const getUser = jest.fn();
        const wrapper = shallow(<Garden crops={[crop]} getUser={getUser} />);

        expect(wrapper.find("div.garden")).toHaveLength(1);
    });

    it("Should dispatch action on logoff", () => {
        const logoff = jest.fn();
        const getUser = jest.fn();

        const wrapper = shallow(<Garden info={crop} crops={[crop]} getUser={getUser} logoff={logoff} />);
        wrapper.find("button.logout").simulate("click");
        
        expect(logoff).toHaveBeenCalled();
    });
});