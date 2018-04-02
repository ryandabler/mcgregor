import React from 'react';
import { shallow } from 'enzyme';

import { ErrorContainer } from './error-container';

describe("<ErrorContainer />", () => {
    let errors;

    beforeEach(() => {
        errors = [
            {
                id: "1",
                code: "401",
                message: "Unauthorized"
            }, {
                id: "2",
                code: "403",
                message: "Forbidden"
            }
        ]
    });

    it("Renders without crashing", () => {
        const wrapper = shallow(<ErrorContainer errors={errors} />);

        expect(wrapper.find("ul.error-container")).toHaveLength(1);
    });
});