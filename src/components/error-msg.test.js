import React from 'react';
import { shallow } from 'enzyme';

import ErrorMsg from './error-msg';

describe("<ErrorMsg />", () => {
    it("Renders without crashing", () => {
        const wrapper = shallow(<ErrorMsg />);

        expect(wrapper.find("li.error-msg")).toHaveLength(1);
    });

    it("Should delete a message", () => {
        const deleteErr = jest.fn();
        const wrapper = shallow(<ErrorMsg delete={deleteErr} id={"3"} />);
        wrapper.find("li .linkify").simulate("click");

        expect(deleteErr).toHaveBeenCalledWith("3");
    });
});