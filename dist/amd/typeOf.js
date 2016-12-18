define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.typeOf = typeOf;
    exports.typeOfIs = typeOfIs;
    exports.typeOfIsMulti = typeOfIsMulti;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    /**
     * Created by elyde on 12/18/2016.
     */

    var _Number = Number.name,
        _NaN = 'NaN',
        _Null = 'Null',
        _Undefined = 'Undefined',
        _undefined = 'undefined';

    /**
     * Returns the class name of an object from it's class string.
     * @note Returns 'NaN' if value type is 'Number' and value isNaN evaluates to true as of version 0.4.85.
     * @note If your type (constructor/class) overrides it's `toString` method use a named `toString` method to get the accurate constructor name out of `typeOf`;  E.g., If you do override `toString` on your class(es) and don't set them to named functions then `sjl.typeOf*` will use Object.prototype.toString to pull your classes type out.
     * @function module:sjl.typeOf
     * @param value {*}
     * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
     */
    function typeOf(value) {
        var retVal;
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _undefined) {
            retVal = _Undefined;
        } else if (value === null) {
            retVal = _Null;
        } else {
            var constructorName = value.constructor.name;
            retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
        }
        return retVal;
    }

    /**
     * Checks to see if an object is of type 'constructor name'.
     * Note: If passing in constructors as your `type` to check, ensure they are *'named' constructors
     * as the `name` property is checked directly on them to use in the class/constructor-name comparison.
     * *'named' constructors - Not anonymous functions/constructors but ones having a name:  E.g.,
     * ```
     * (function Hello () {}) // Named function.
     * (function () {}) // Anonymous function.
     * ```
     * @function module:sjl.typeOfIs
     * @param obj {*} - Object to be checked.
     * @param type {String|Function} - Either a constructor name or an constructor itself.
     * @returns {Boolean} - Whether object matches class string or not.
     */
    function typeOfIs(obj, type) {
        return typeOf(obj) === (type instanceof Function ? type.name : type);
    }

    /**
     * Check if `value` is of one of the passed in types.
     * @function module:sjl.typeOfIsMulti
     * @param value {*}
     * @param types {...Function|...String} - Constructor or string.
     * @returns {boolean}
     */
    function typeOfIsMulti(value) {
        for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            types[_key - 1] = arguments[_key];
        }

        return types.some(function (_type) {
            return typeOfIs(value, _type);
        });
    }

    exports.default = {
        typeOf: typeOf,
        typeOfIs: typeOfIs,
        typeOfIsMulti: typeOfIsMulti
    };
});