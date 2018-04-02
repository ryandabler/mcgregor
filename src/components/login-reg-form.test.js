import React from 'react';
import { shallow } from 'enzyme';

import { LoginRegForm } from './login-reg-form';

describe("<LoginRegForm />", () => {
    it.only("Renders without crashing", () => {
        const wrapper = shallow(<LoginRegForm />);

        expect(wrapper.find("form.login-reg-form")).toHaveLength(1);
    });
});