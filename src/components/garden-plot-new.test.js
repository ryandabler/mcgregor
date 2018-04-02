import React from 'react';
import { shallow } from 'enzyme';

import GardenPlotNew from './garden-plot-new';

describe("<GardenPlotNewForm />", () => {
    it("Renders without crashing", () => {
        const wrapper = shallow(<GardenPlotNew />);
        expect(wrapper.find("div.garden-plot-new")).toHaveLength(1);
    });
});