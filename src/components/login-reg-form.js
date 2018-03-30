import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { switchToLoginMode, switchToRegisterMode, login, registerUser } from "../actions";
import { extractFormValues } from "../utilities";

import "./login-reg-form.css";

export function LoginRegForm(props) {
    function handleSubmission(e) {
        e.preventDefault();
        const formValues = extractFormValues(e.target.elements);

        if (props.login) {
            const { username, password } = formValues;
            props.dispatch(login(username, password));
        } else {
            const { username, password, email } = formValues;
            props.dispatch(registerUser(username, password, email))
                .then(() => props.dispatch(login(username, password)));
        }
    }

    function toggleForm() {
        if (props.login) {
            props.dispatch(switchToRegisterMode());
        } else {
            props.dispatch(switchToLoginMode());
        }
    }

    const msg = props.login ? 
        <p>No user account? <span onClick={() => toggleForm()} className="linkify">Register!</span></p>
        : <p>Have an account? <span onClick={() => toggleForm()} className="linkify">Log in!</span></p>

    if (props.login) {
        return (
            <form onSubmit={handleSubmission} className="login-reg-form">
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <input type="submit" value="Login" />
                {msg}
            </form>
        );
    } else {
        return (
            <form onSubmit={handleSubmission} className="login-reg-form">
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <label htmlFor="conf-password">Confirm Password</label>
                <input type="password" id="conf-password" name="password" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <input type="submit" value="Login" />
                {msg}
            </form>
        );
    }
}

LoginRegForm.propTypes = {
    login: PropTypes.bool,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
        login: state.loginRegType === "login" ? true : false
});

export default connect(mapStateToProps)(LoginRegForm);