(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.typeOf_ = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.typeOf = typeOf;

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
     * Returns the class name of an object from it's class stringOps.
     * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
     * @function module:fjl.typeOf
     * @param value {*}
     * @returns {string} - Constructor's name property if not null or undefined (in which case a
     *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
     */
    function typeOf(value) {
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
    }
});