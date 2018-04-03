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
            <section className="mcgregor splash flex">
                <h1>mcGregor</h1>
            </section>
            <section className="splash">
                <p>Welcome to mcGregor, a handy tool for garden oversight.</p>
                <p>Manage your plantings year to year with note cards designed for recording sowing
                    specifications and anticipated harvest dates.</p>
                <p>As you comment on your garden&apos;s unique development, each remark is compiled
                    into a master journal annually archived for future reference.</p>
                <p>Whether you call yourself an earthy farmer or fluent horticulturalist,
                    bear an emerald thumb or are just beginning your agronomical journey,
                    mcGregor can track your experiences to keep your nurtured beds burgeoning.</p>
                <p>So dig deep and grasp the nettle!</p>
            </section>
            <section className="splash flex">
                <LoginRegForm />
            </section>
        </div>
	);
}

LandingPage.propTypes = {
    authToken: PropTypes.string
}

const mapStateToProps = state => ({
    authToken: state.authToken
});

export default connect(mapStateToProps)(LandingPage);