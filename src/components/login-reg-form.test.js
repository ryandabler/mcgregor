import React from 'react';
import { shallow, mount } from 'enzyme';

import { LoginRegForm } from './login-reg-form';

describe("<LoginRegForm />", () => {
    it("Renders without crashing", () => {
        const wrapper = shallow(<LoginRegForm />);

        expect(wrapper.find("form.login-reg-form")).toHaveLength(1);
    });

    it("Should switch to register mode", () => {
        const switchToRegisterMode = jest.fn();
        const wrapper = mount(<LoginRegForm login={true} switchToRegisterMode={switchToRegisterMode} />);
        wrapper.find(".linkify").simulate("click");
        
        expect(switchToRegisterMode).toHaveBeenCalled();
    });

    it("Should switch to login mode", () => {
        const switchToLoginMode = jest.fn();
        const wrapper = mount(<LoginRegForm login={false} switchToLoginMode={switchToLoginMode} />);
        wrapper.find(".linkify").simulate("click");
        
        expect(switchToLoginMode).toHaveBeenCalled();
    });

    it("Should log a user in", () => {
        const loginUser = jest.fn();
        const wrapper = mount(<LoginRegForm login={true} loginUser={loginUser}/>);

        wrapper.find("#username").instance().value = "user";
        wrapper.find("#password").instance().value = "password";
        wrapper.find("form").simulate("submit");
        
        expect(loginUser).toHaveBeenCalledWith("user", "password");
    });

    it("Should ensure passwords match when registering", () => {
        const validatePasswords = jest.fn();
        const dummy = jest.fn();
        const wrapper = mount(<LoginRegForm login={false} validatePasswords={validatePasswords} registerUser={dummy} />);

        wrapper.find("#username").instance().value = "user";
        wrapper.find("#password").instance().value = "password";
        wrapper.find("#confPassword").instance().value = "password2";
        wrapper.find("#email").instance().value = "email@email.com";
        wrapper.find("form").simulate("submit");
        
        expect(validatePasswords).toHaveBeenCalledWith("password", "password2");
    });

    it("Should not register user when passwords don't match", () => {
        const registerUser = jest.fn();
        const validatePasswords = function() { return false; };
        const wrapper = mount(<LoginRegForm login={false} validatePasswords={validatePasswords} registerUser={registerUser} />);

        wrapper.find("#username").instance().value = "user";
        wrapper.find("#password").instance().value = "password";
        wrapper.find("#confPassword").instance().value = "password2";
        wrapper.find("#email").instance().value = "email@email.com";
        wrapper.find("form").simulate("submit");
        
        expect(registerUser).not.toHaveBeenCalled();
    });

    it("Should register user when all info is correct", () => {
        const registerUser = jest.fn();
        const validatePasswords = function() { return true; };
        const wrapper = mount(<LoginRegForm login={false} validatePasswords={validatePasswords} registerUser={registerUser} />);

        wrapper.find("#username").instance().value = "user";
        wrapper.find("#password").instance().value = "password";
        wrapper.find("#confPassword").instance().value = "password";
        wrapper.find("#email").instance().value = "email@email.com";
        wrapper.find("form").simulate("submit");
        
        expect(registerUser).toHaveBeenCalledWith("user", "password", "email@email.com");
    });
});