import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import "./login-reg-form.css";

export function LoginRegForm(props) {
    if (props.login) {
        return (
            <form onSubmit={props.onSubmit} className="login-reg-form">
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <input type="submit" value="Login" />
            </form>
        );
    } else {
        return (
            <form onSubmit={props.onSubmit} className="login-reg-form">
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <label htmlFor="conf-password">Confirm Password</label>
                <input type="password" id="conf-password" name="password" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

LoginRegForm.propTypes = {
    login: PropTypes.bool,
    onSubmit: PropTypes.func
}

const mapStateToProps = state => {
    return {
        login: state.loginRegType === "login" ? true : false
    };
}

export default connect(mapStateToProps)(LoginRegForm);