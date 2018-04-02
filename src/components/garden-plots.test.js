import React from 'react';
import { shallow } from 'enzyme';

import GardenPlots from './garden-plots';

describe("<GardenPlots />", () => {
    it("Renders without crashing", () => {
        const crop = {
            id: "Abc",
            name: "Tomato",
            variety: "Heirloom",
            plant_date: "2018-03-14",
            germination_days: "10",
            harvest_days: "20",
            planting_depth: "1.2",
            row_spacing: "1.3",
            seed_spacing: "1.4",
            status: "viewing"
        }

    const wrapper = shallow(<GardenPlots crops={[crop]} />);
        expect(wrapper.find("div.garden-plots")).toHaveLength(1);
    });
});