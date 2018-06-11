import {isArray, _isType} from './_is';
import {_assign, keys} from '../_jsPlatform/_object';

export const

    /**
     * Returns an associated from given object.
     * @note Useful for working with object primitive (json and the like).
     * @function module:objectOps._toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = obj => keys(obj).map(key => [key, obj[key]]),

    /**
     * Returns an associated list from given object (deeply (on incoming object's type)).
     * @note Does deep conversion on all values of passed in type's type.
     * @function module:objectOps.toAssocListDeep
     * @param obj {*}
     * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
     * @returns {*}
     */
    toAssocListDeep = (obj, TypeConstraint = Object) => keys(obj).map(key =>
        TypeConstraint && _isType(TypeConstraint, obj[key]) ?
            [key, toAssocListDeep(obj[key], TypeConstraint)] :
            [key, obj[key]]
    ),

    /**
     * From associated list to object.
     * @function module:objectOps.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
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
    fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        if (isArray(value) && isArray(value[0])) {
            agg[key] = fromAssocList(value);
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
     * @returns {*}
     */
    toArrayMap = toAssocList,

    /**
     * Converts an array-map into an object (one level).
     * @alias `fromAssocList`
     * @function module:objectOps.fromArrayMap
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = fromAssocList

;
