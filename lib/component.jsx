"use strict";

/**
 * React Option element.
 *
 *
 *
 * <i>Copyright (c) 2016 ItsAsbreuk - http://itsasbreuk.nl</i><br>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module option/lib/component.jsx
 * @class Option
 * @since 15.0.0
*/

const React = require("react"),
    PropTypes = React.PropTypes,
    ReactDom = require("react-dom"),
    async = require("itsa-utils").async,
    FocusContainer = require("itsa-react-focuscontainer"),
    MAIN_CLASS = "itsa-option",
    OPTION_ITEM_CLASS = MAIN_CLASS + "-option",
    OPTION_BULLET_CLASS = MAIN_CLASS + "-bullet",
    OPTION_BULLET_INNER_CLASS = OPTION_BULLET_CLASS + "-inner",
    OPTION_CHECKED_CLASS_SPACED = " " + MAIN_CLASS + "-checked",
    OPTION_TEXT_CLASS = " " + MAIN_CLASS + "-text",
    FORM_ELEMENT_CLASS_SPACED = " itsa-formelement";

const sortFn = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

const Component = React.createClass({
    propTypes: {
        /**
         * Whether to autofocus the Component.
         *
         * @property autoFocus
         * @type Boolean
         * @default false
         * @since 0.0.1
        */
        autoFocus: PropTypes.bool,

        /**
         * A number -or Array with numbers- that define the option that is selected
         *
         * @property checked
         * @type Number|Array
         * @since 0.0.1
        */
        checked: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),

        /**
         * Whether render the options as HTML. When set `false`, they will be plain text, removed from any html-entities.
         *
         * @property dangerousInnerHTML
         * @type Boolean
         * @default false
         * @since 0.0.1
        */
        dangerousInnerHTML: PropTypes.bool,

        /**
         * Whether the focuscontainer is disabled (doesn"t response to focusevents)
         *
         * @property disabled
         * @type Boolean
         * @since 15.0.0
        */
        disabled: PropTypes.bool,

        /**
         * Render-function for the options. You can use this property to override the default
         * renderer. When not set, the default-renderer will be used.
         *
         * This function gets called for every option of the `this.props.options` array.
         * The function recieves 3 arguments: `option`, `index`, `checked`
         * Should return a JSX li-element.
         *
         * @property ItemRenderer
         * @type Function
         * @return JSX li-element
         * @since 0.0.1
        */
        itemRenderer: PropTypes.func,

        /**
         * What key/keys are responsible for re-focussing `down`. Valid values are charcodes possible prepende with
         * a special key: 9 or `shift+9` or `ctrl+shift+9`. Multiple key combinations can be defined bydefining an array of keyDown-values.
         *
         * @property keyDown
         * @default 40
         * @type String|number|Array
         * @since 15.0.0
        */
        keyDown: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),

        /**
         * Whenever `keyEnter` is set, then the focus-container will become a `nested`- focuscontainer.
         * Nested focuscontainers will automaticcaly become focussable by their parent-container.
         *
         * The `keyEnter` determines what key/keys are responsible for `entering` this container. Valid values are charcodes possible prepende with
         * a special key: 39 or `shift+39` or `ctrl+shift+39`. Multiple key combinations can be defined bydefining an array of keyUp-values.
         *
         * @property keyEnter
         * @default 13
         * @type String|number|Array
         * @since 15.0.0
        */
        keyEnter: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),

        /**
         * The `keyLeave` determines what key/keys are responsible for `leaving` this container and go to the parent focus-container.
         * Valid values are charcodes possible prepende with
         * a special key: 39 or `shift+39` or `ctrl+shift+39`. Multiple key combinations can be defined bydefining an array of keyUp-values.
         *
         * @property keyLeave
         * @default 27
         * @type String|number|Array
         * @since 15.0.0
        */
        keyLeave: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),

        /**
         * What key/keys are responsible for selecting an option by keyboard. Valid values are charcodes possible prepended with
         * a special key: 9 or `shift+9` or `ctrl+shift+9`. Multiple key combinations can be defined bydefining an array of keyUp-values.
         *
         * @property keyUp
         * @default [13, 32]
         * @type String|number|Array
         * @since 15.0.0
        */
        keySelect: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),

        /**
         * What key/keys are responsible for re-focussing `up`. Valid values are charcodes possible prepended with
         * a special key: 9 or `shift+9` or `ctrl+shift+9`. Multiple key combinations can be defined bydefining an array of keyUp-values.
         *
         * @property keyUp
         * @default 38
         * @type String|number|Array
         * @since 15.0.0
        */
        keyUp: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),

        /**
         * Whether the loop the focus when the last/first option is reached.
         *
         * @property loop
         * @default false
         * @type Boolean
         * @since 15.0.0
        */
        loop: PropTypes.bool,

        /**
         * Whether multiple options can be selected at the same time.
         *
         * @property multi
         * @default false
         * @type Boolean
         * @since 15.0.0
        */
        multi: PropTypes.bool,

        /**
         * Callback whenever a new value is set. The callbackFn will recieve 1 argment: the new `checked` option(s).
         * Which is a `number` in case `props.multi`===fals,e, otherwise it is an array with numbers.
         *
         * @property onChange
         * @required
         * @type Function
         * @since 15.0.0
        */
        onChange: PropTypes.func.isRequired,

        /**
         * Callback for when the component did mount.
         *
         * @property onMount
         * @type Function
         * @since 15.0.8
        */
        onMount: PropTypes.func,

        /**
         * List with all options
         *
         * @property options
         * @type Array
         * @required
         * @since 15.0.0
        */
        options: PropTypes.array.isRequired,

        /**
         * Whether the focussed option should be scrolled into the view when the focusselector focuses it.
         *
         * @property scrollIntoView
         * @default false
         * @type String
         * @since 15.0.30
        */
        scrollIntoView: PropTypes.bool,

        /**
         * Selector on which the focusmanager should check against when refocussing
         *
         * @property selector
         * @type String
         * @since 15.0.0
        */
        selector: PropTypes.string,

        /**
         * Inline styles for the focus-container
         *
         * @property style
         * @type Object
         * @since 15.0.0
        */
        style: PropTypes.object,

        /**
         * The tabIndex
         *
         * @property tabIndex
         * @type Number
         * @since 0.0.1
        */
        tabIndex: PropTypes.number,

        /**
         * The transition-time when the window needs to be scrolled in order to get the focussable node into the view.
         *
         * @property transitionTime
         * @type Number
         * @since 15.0.0
        */
        transitionTime: PropTypes.number
    },

    /**
     * componentDidMount will call `this.activatePlaces()`;
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this;
        instance._domNode = ReactDom.findDOMNode(instance);
        instance.props.autoFocus && instance.focus();
    },


    /**
     * Returns the default properties.
     *
     * @method getDefaultProps
     * @since 0.0.1
     */
    getDefaultProps() {
        return {
            checked: [],
            dangerousInnerHTML: false,
            keyDown: 40,
            keyEnter: 13,
            keySelect: [13, 32],
            keyUp: 38,
            loop: false,
            multi: false,
            scrollIntoView: false,
            selector: ".itsa-option-option"
        };
    },


    /**
     * Returns the index of the first option that is selected
     *
     * @method getFirstSelected
     * @return {Number|undefined} the index (if any) of the first selected option
     * @since 15.0.0
     */
    getFirstSelected() {
        let cloned;
        const checked = this.props.checked;
        if (typeof checked === "number") {
            return checked;
        }
        if (checked.length === 0) {
            return;
        }
        cloned = checked.itsa_deepClone();
        cloned.sort(sortFn);
        return cloned[0];
    },


    /**
     * Sets a new option.
     *
     * @method handleSetOption
     * @param index {Number}
     * @since 0.0.1
     */
    handleSetOption(index) {
        let newValue;
        const instance = this,
            props = instance.props,
            checked = props.checked;
        if (!props.disabled) {
            if (!instance.props.multi) {
                newValue = index;
            } else {
                newValue = (typeof checked === "number") ? [checked] : checked.itsa_deepClone();
                if (newValue.itsa_contains(index)) {
                    // remove option
                    (newValue.length > 1) && newValue.itsa_remove(index);
                } else {
                    newValue.push(index);
                }
            }
            // go async, to make proper rendering
            async(() => instance.refs["focus-container"].focusElement(index));
            return props.onChange(newValue);
        }
    },


    /**
     * Sets the focus on the active Element of the Container.
     *
     * @method focus
     * @chainable
     * @since 0.0.1
     */
    focus() {
        const instance = this,
            index = instance.getFirstSelected();
        return (typeof index === "number") ? instance.focusOption(index) : instance.refs["focus-container"].focusActiveElement();
    },


    /**
     * Sets the focus on the specified Element of the Container.
     *
     * @method focusOption
     * @param index {Number} the index of the option to be focussed
     * @chainable
     * @since 0.0.1
     */
    focusOption(index) {
        return this.refs["focus-container"].focusElement(index);
    },


    /**
     * Render-function for the options. You can use this property to override the default
     * renderer. When not set, the default-renderer will be used.
     *
     * @method renderItem
     * @param option {String} the option to be rendered
     * @param i {Number} the index of the option
     * @param checked {Number} the index of the option to be focussed
     * return {JSX} li-element for the option
     * @since 0.0.1
    */
    renderItem(option, i, checked) {
        let checkedDiv;
        const instance = this,
            ariaLabel = instance._saveHTML(option);
        return (
            <li
                aria-label={ariaLabel}
                className={OPTION_ITEM_CLASS}
                data-id={i}
                key={i}
                onClick={instance.handleSetOption.bind(instance, i)}
                role="listitem" >
                <div className={OPTION_BULLET_CLASS}>
                    <div className={checked ? OPTION_BULLET_INNER_CLASS + OPTION_CHECKED_CLASS_SPACED : OPTION_BULLET_INNER_CLASS} />
                </div>
                <div className={OPTION_TEXT_CLASS} dangerouslySetInnerHTML={{__html: option }} />
            </li>
        );
    },


    /**
     * Callback for the keypress event.
     *
     * @method handleKeyPress
     * @param e {Object}
     * @since 15.0.0
     */
    handleKeyPress(e) {
        let liNodes, index, keySelect;
        const instance = this;
        keySelect = instance.props.keySelect;
        (typeof keySelect === "number") && (keySelect = [keySelect]);
        if (keySelect.itsa_contains(e.charCode)) {
            liNodes = instance._domNode.firstElementChild.children; // array-like object
            index = Array.prototype.indexOf.call(liNodes, e.target);
            instance.handleSetOption(index);
        }
    },


    /**
     * Tells ifthe Component has a valid option selected.
     *
     * @method isValid
     * @return {Boolean} whether the Component has a valid option selected
     * @since 15.0.0
     */
    isValid() {
        const checked = this.props.checked;
        return (typeof checked === "number") || (checked.length > 0);
    },


    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponent
     * @since 15.0.0
     */
    render() {
        var classname = MAIN_CLASS + FORM_ELEMENT_CLASS_SPACED;
        var instance = this,
            props = instance.props,
            propsChecked = props.checked,
            propsClass = props.className,
            checked = (typeof propsChecked === "number") ? [propsChecked] : propsChecked,
            checkedSingleCorrected = props.multi || instance._toOnlyOne(checked),
            itemRenderer = props.itemRenderer || instance.renderItem,
            dangerousInnerHTML = props.dangerousInnerHTML,
            options = props.options.map((option, i) => itemRenderer(dangerousInnerHTML ?
                                                                    option :
                                                                    instance._saveHTML(option), i, props.multi ? checked.itsa_contains(i) : checkedSingleCorrected[i])
                                       );

        propsClass && (classname += " " + propsClass);
        return (
            <FocusContainer
                className={classname}
                disabled={props.disabled}
                focusOnContainerClick={true}
                keyDown={props.keyDown}
                keyEnter={props.keyEnter}
                keyLeave={props.keyLeave}
                keyUp={props.keyUp}
                loop={props.loop}
                onMount={props.onMount}
                ref="focus-container"
                scrollIntoView={props.scrollIntoView}
                selector={props.selector}
                style={props.style}
                tabIndex={props.tabIndex}
                transitionTime={props.transitionTime} >
                <ul onKeyPress={instance.handleKeyPress}>
                    {options}
                </ul>
            </FocusContainer>
        );
    },


    /**
     * Returns a save string
     *
     * @method _saveHTML
     * @private
     * @param String html the text that should be removed from any html-entities
     * @return String
     * @since 0.0.1
     */
    _saveHTML(html) {
        return html && html.replace(/<[^>]*>/g, "");
    },


    /**
     * Returns an array based upon `checked`, with the length of `this.props.options`,
     * where only one item is `true` and the rest will be set `false`. The checked item is the first
     * item of the `this.props.checked` array.
     *
     * This will quarantee that there is only 1 option marked as being selected.
     * Only be needed whenever `this.props.multi`===false.
     *
     * @method _toOnlyOne
     * @private
     * @param checked {Array} the checked-array
     * @return {Array} with max. one item `true`
     * @since 15.0.0
     */
    _toOnlyOne(checked) {
        var result = [],
            len = this.props.options.length,
            setFalse = false,
            i = void 0,
            itemValue = void 0;
        for (i = 0; i < len; i++) {
            itemValue = checked.itsa_contains(i);
            result[i] = setFalse ? false : itemValue;
            if (!setFalse && itemValue) {
                setFalse = true;
            }
        }
        return result;
    }
});

module.exports = Component;