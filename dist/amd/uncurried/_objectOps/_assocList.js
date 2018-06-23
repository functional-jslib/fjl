define(['exports', './_is', '../_jsPlatform/_object'], function (exports, _is, _object) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromArrayMap = exports.toArrayMap = exports.fromAssocListDeep = exports.fromAssocList = exports.toAssocListDeep = exports.toAssocList = undefined;
    const

    /**
     * Returns an associated list from given object.
     * @note Useful for working with plain javascript objects.
     * @function module:objectOps._toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = exports.toAssocList = obj => (0, _object.keys)(obj).map(key => [key, obj[key]]),


    /**
     * Returns an associated list from given object (deeply (on incoming object's type)).
     * @note Does deep conversion on all values of passed in type's type.
     * @function module:objectOps.toAssocListDeep
     * @param obj {*}
     * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
     * @returns {*}
     */
    toAssocListDeep = exports.toAssocListDeep = (obj, TypeConstraint = Object) => (0, _object.keys)(obj).map(key => TypeConstraint && (0, _is._isType)(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]]),


    /**
     * From associated list to object.
     * @function module:objectOps.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocList = exports.fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, new OutType()),


    /**
     * From associated list to object.
     * @note Considers array of arrays associated lists.
     * @function module:objectOps.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocListDeep = exports.fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        if ((0, _is.isArray)(value) && (0, _is.isArray)(value[0])) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType()),


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
});