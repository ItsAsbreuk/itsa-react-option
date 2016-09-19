[![Build Status](https://travis-ci.org/ItsAsbreuk/itsa-react-option.svg?branch=master)](https://travis-ci.org/ItsAsbreuk/itsa-react-option)

Beautiful iOS-stylisch checkbox for react.

Lightweight, focussable and responses to the spacebar.

## How to use:

```js
const ReactDOM = require("react-dom"),
      Component = require("itsa-react-option");

const handleChange = newChecked => {
    props.checked = newChecked;
    renderOptionComponent();
};

let props = {
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
```

## About the css

You need the right css in order to make use of `itsa-react-option`. There are 2 options:

1. You can use the css-files inside the `css`-folder.
2. You can use: `Component = require("itsa-react-option/lib/component-styled.jsx");` and build your project with `webpack`. This is needed, because you need the right plugin to handle a requirement of the `scss`-file.


[View live example](http://projects.itsasbreuk.nl/react-components/itsa-option/component.html)

[API](http://projects.itsasbreuk.nl/react-components/itsa-option/api/)