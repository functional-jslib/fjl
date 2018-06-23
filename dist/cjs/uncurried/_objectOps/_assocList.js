'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromArrayMap = exports.toArrayMap = exports.fromAssocListDeep = exports.fromAssocList = exports.toAssocListDeep = exports.toAssocList = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _is = require('./_is');

var _object = require('../_jsPlatform/_object');

var

/**
 * Returns an associated list from given object.
 * @note Useful for working with plain javascript objects.
 * @function module:objectOps._toAssocList
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
 * @function module:objectOps.toAssocListDeep
 * @param obj {*}
 * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
 * @returns {*}
 */
toAssocListDeep = exports.toAssocListDeep = function toAssocListDeep(obj) {
    var TypeConstraint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
    return (0, _object.keys)(obj).map(function (key) {
        return TypeConstraint && (0, _is._isType)(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]];
    });
},


/**
 * From associated list to object.
 * @function module:objectOps.fromAssocList
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
 * From associated list to object.
 * @note Considers array of arrays associated lists.
 * @function module:objectOps.fromAssocList
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

        if ((0, _is.isArray)(value) && (0, _is.isArray)(value[0])) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType());
},


/**
 * Returns an array map (associated list) representing incoming value (object, array, etc.).
 * @alias `toAssocList`
 * @function module:objectOps.toArrayMap
 * @param obj {(Object|Array|*)}
 * @deprecated
 * @returns {*}
 */
toArrayMap = exports.toArrayMap = toAssocList,


/**
 * Converts an array-map into an object (one level).
 * @alias `fromAssocList`
 * @function module:objectOps.fromArrayMap
 * @param xs {Array|*} - Array-map (associated list).
 * @deprecated
 * @returns {*}
 */
fromArrayMap = exports.fromArrayMap = fromAssocList;