import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { switchToLoginMode, switchToRegisterMode, login, registerUser, addError } from "../actions";
import { extractFormValues } from "../utilities";

import "./login-reg-form.css";

export function LoginRegForm(props) {
    function handleSubmission(e) {
        e.preventDefault();
        const formValues = extractFormValues(e.target.elements);

        if (props.login) {
            const { username, password } = formValues;
            props.loginUser(username, password);
        } else {
            const { username, password, email } = formValues;
            props.registerUser(username, password, email);
        }
    }

    function toggleForm() {
        if (props.login) {
            props.switchToRegisterMode();
        } else {
            props.switchToLoginMode();
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
    dispatch: PropTypes.func,
    loginUser: PropTypes.func,
    registerUser: PropTypes.func,
    switchToRegisterMode: PropTypes.func,
    switchToLoginMode: PropTypes.func
}

const mapStateToProps = state => ({
    login: state.loginRegType === "login" ? true : false
});

const mapDispatchToProps = dispatch => ({
    loginUser: (username, password) =>
        dispatch(login(username, password))
            .catch(err => dispatch(addError(err.code, err.message))),

    registerUser: (username, password, email) => 
        dispatch(registerUser(username, password, email))
            .then(() => dispatch(login(username, password)))
            .catch(err => dispatch(addError(err.code, err.message))),

    switchToRegisterMode: () => dispatch(switchToRegisterMode()),

    switchToLoginMode: () => dispatch(switchToLoginMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegForm);