"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Component = require("./lib/component-styled.jsx");

const handleChange = newChecked => {
    props.checked = newChecked;
    renderOptionComponent();
};

let props = {
    autoFocus: true,
    options: [
        "Januari",
        "Februari",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    checked: 3,
    onChange: handleChange
};

const renderOptionComponent = () => {
    ReactDOM.render(
        <Component {...props} />,
        document.getElementById("component-container")
    );
};

renderOptionComponent();