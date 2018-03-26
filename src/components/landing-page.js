import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";

import LoginRegForm from "./login-reg-form";
import { switchToRegisterMode, switchToLoginMode, login, registerUser } from "../actions";
import { extractFormValues } from "../utilities";

import "./landing-page.css";

export function LandingPage(props) {
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

    if (props.authToken) {
        return <Redirect to="/garden" />;
    }

	return (
        <div className="landing-page">
            <section className="mcgregor splash">
                <h1>McGregor</h1>
            </section>
            <section className="splash">
                <h2>Lorem ipsum</h2>
            </section>
            <section className="splash">
                <div>
                    <LoginRegForm onSubmit={handleSubmission} />
                    {msg}
                </div>
            </section>
        </div>
	);
}

LandingPage.propTypes = {
    login: PropTypes.bool,
    authToken: PropTypes.string,
    dispatch: PropTypes.func
}

const mapStateToProps = state => {
    return {
        login: state.loginRegType === "login" ? true : false,
        authToken: state.authToken
    }
}

export default connect(mapStateToProps)(LandingPage);