import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";

import LoginRegForm from "./login-reg-form";

import "./landing-page.css";

export function LandingPage(props) {
    if (props.authToken) {
        return <Redirect to="/garden" />;
    }

	return (
        <div className="landing-page">
            <section className="mcgregor splash">
                <h1>mcGregor</h1>
            </section>
            <section className="splash">
                <h2>Lorem ipsum</h2>
            </section>
            <section className="splash">
                <LoginRegForm />
            </section>
        </div>
	);
}

LandingPage.propTypes = {
    authToken: PropTypes.string
}

const mapStateToProps = state => {
    return {
        authToken: state.authToken
    }
}

export default connect(mapStateToProps)(LandingPage);