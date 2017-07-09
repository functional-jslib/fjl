define(['exports', './curry'], function (exports, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.typeOfIs = exports.typeOf = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var _Number = Number.name,
        _NaN = 'NaN',
        _Null = 'Null',
        _Undefined = 'Undefined',
        _undefined = 'undefined';

    /**
     * Returns the class name of an object from it's class string.
     * @note Returns 'NaN' if value type is 'Number' and value isNaN evaluates to true as of version 0.4.85.
     * @note If your type (constructor/class) overrides it's `toString` method use a named `toString` method to get the accurate constructor name out of `typeOf`;  E.g., If you do override `toString` on your class(es) and don't set them to named functions then `sjl.typeOf*` will use Object.prototype.toString to pull your classes type out.
     * @function module:fjl.typeOf
     * @param value {*}
     * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
     */
    var typeOf = exports.typeOf = function typeOf(value) {
        var retVal = void 0;
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _undefined) {
            retVal = _Undefined;
        } else if (value === null) {
            retVal = _Null;
        } else {
            var constructorName = value.constructor.name;
            retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
        }
        return retVal;
    },


    /**
     * Checks to see if an object is of type 'constructor name'.
     * Note: If passing in constructors as your `type` to check, ensure they are *'named' constructors
     * as the `name` property is checked directly on them to use in the class/constructor-name comparison.
     * *'named' constructors - Not anonymous functions/constructors but ones having a name:  E.g.,
     * ```
     * (function Hello () {}) // Named function.
     * (function () {}) // Anonymous function.
     * ```
     * @function module:fjl.typeOfIs
     * @param type {String|Function} - Either a constructor name or an constructor itself.
     * @param obj {*} - Object to be checked.
     * @returns {Boolean} - Whether object matches class string or not.
     */
    typeOfIs = exports.typeOfIs = (0, _curry.curry2)(function (type, obj) {
        return typeOf(obj) === (type instanceof Function ? type.name : type);
    });

    exports.default = {
        typeOf: typeOf,
        typeOfIs: typeOfIs
    };
});