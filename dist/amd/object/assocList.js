define(['exports', './is', '../jsPlatform/object'], function (exports, _is, _object) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromAssocListDeep = exports.fromAssocList = exports.toAssocListDeep = exports.toAssocList = undefined;
    const

    /**
     * Returns an associated list from given object.
     * @note Useful for working with plain javascript objects.
     * @function module:object.toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = exports.toAssocList = obj => (0, _object.keys)(obj).map(key => [key, obj[key]]),


    /**
     * Returns an associated list from given object (deeply (on incoming object's type)).
     * @note Does deep conversion on all values of passed in type's type.
     * @function module:object.toAssocListDeep
     * @param obj {*}
     * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
     * @returns {*}
     */
    toAssocListDeep = exports.toAssocListDeep = (obj, TypeConstraint = Object) => (0, _object.keys)(obj).map(key => TypeConstraint && (0, _is.isType)(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]]),


    /**
     * From associated list to object.
     * @function module:object.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocList = exports.fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, new OutType()),


    /**
     * From associated list to object (deep conversion on associative lists (array of 2 value arrays)).
     * @note Considers array of arrays associated lists.
     * @function module:object.fromAssocListDeep
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocListDeep = exports.fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        if ((0, _is.isArray)(value) && (0, _is.isArray)(value[0]) && value[0].length === 2) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType());
});