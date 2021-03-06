[![Build Status](https://travis-ci.org/ItsAsbreuk/itsa-react-option.svg?branch=master)](https://travis-ci.org/ItsAsbreuk/itsa-react-option)

Beautiful option-list for react.

Lightweight, focussable and key-responsive.

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


#### If you want to express your appreciation

Feel free to donate to one of these addresses; my thanks will be great :)

* Ether: 0xE096EBC2D19eaE7dA8745AA5D71d4830Ef3DF963
* Bitcoin: 37GgB6MrvuxyqkQnGjwxcn7vkcdont1Vmg
