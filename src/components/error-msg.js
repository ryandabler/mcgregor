import React from "react";
import { PropTypes } from "prop-types";

import "./error-msg.css";

export default function ErrorMsg(props) {
    return (
        <li className="error-msg">
            {props.message}
            <div onClick={() => props.delete(props.id)} className="close linkify">x</div>
        </li>
    );
}

ErrorMsg.propTypes = {
    id: PropTypes.string,
    message: PropTypes.string,
    delete: PropTypes.func
}