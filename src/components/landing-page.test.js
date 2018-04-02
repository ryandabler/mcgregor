import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from "react-router-dom";

import { LandingPage } from './landing-page';

describe("<Journal />", () => {
    it("Renders without crashing", () => {
        const wrapper = shallow(<LandingPage />);

        expect(wrapper.find("div.landing-page")).toHaveLength(1);
    });

    it("Should redirect if user has authToken", () => {
        const wrapper = shallow(<LandingPage authToken={"ABCD"} />);
        
        expect(wrapper.find(Redirect)).toHaveLength(1);
        expect(wrapper.find(".landing-page")).toHaveLength(0);
    });
});