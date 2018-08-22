(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is', '../jsPlatform/object'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is'), require('../jsPlatform/object'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.object);
        global.assocList = mod.exports;
    }
})(this, function (exports, _is, _object) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromAssocListDeep = exports.fromAssocList = exports.toAssocListDeep = exports.toAssocList = undefined;

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var

    /**
     * Returns an associated list from given object.
     * @note Useful for working with plain javascript objects.
     * @function module:object.toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = exports.toAssocList = function toAssocList(obj) {
        return (0, _object.keys)(obj).map(function (key) {
            return [key, obj[key]];
        });
    },


    /**
     * Returns an associated list from given object (deeply (on incoming object's type)).
     * @note Does deep conversion on all values of passed in type's type.
     * @function module:object.toAssocListDeep
     * @param obj {*}
     * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
     * @returns {*}
     */
    toAssocListDeep = exports.toAssocListDeep = function toAssocListDeep(obj) {
        var TypeConstraint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
        return (0, _object.keys)(obj).map(function (key) {
            return TypeConstraint && (0, _is.isType)(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]];
        });
    },


    /**
     * From associated list to object.
     * @function module:object.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocList = exports.fromAssocList = function fromAssocList(xs) {
        var OutType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
        return xs.reduce(function (agg, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            agg[key] = value;
            return agg;
        }, new OutType());
    },


    /**
     * From associated list to object (deep conversion on associative lists (array of 2 value arrays)).
     * @note Considers array of arrays associated lists.
     * @function module:object.fromAssocListDeep
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocListDeep = exports.fromAssocListDeep = function fromAssocListDeep(xs) {
        var OutType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
        return xs.reduce(function (agg, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            if ((0, _is.isArray)(value) && (0, _is.isArray)(value[0]) && value[0].length === 2) {
                agg[key] = fromAssocListDeep(value, OutType);
                return agg;
            }
            agg[key] = value;
            return agg;
        }, new OutType());
    };
});