import {isArray, isType} from './is';
import {keys} from '../platform/object';
import {TypeConstructor} from "../types";

export const

    /**
     * Returns an associated list from given object.
     * @note Useful for working with plain javascript objects.
     * @function module:object.toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = obj => keys(obj).map(key => [key, obj[key]]),

    /**
     * Returns an associated list from given object (deeply (on incoming object's type)).
     * @note Does deep conversion on all values of passed in type's type.
     * @function module:object.toAssocListDeep
     * @param obj {*}
     * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
     * @returns {*}
     */
    toAssocListDeep = (obj, TypeConstraint: TypeConstructor = Object) => keys(obj).map(key =>
        TypeConstraint && isType(TypeConstraint, obj[key]) ?
            [key, toAssocListDeep(obj[key], TypeConstraint)] :
            [key, obj[key]]
    ),

    /**
     * From associated list to object.
     * @function module:object.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
     * @returns {*} - Default is `Object`
     */
    fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
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
    fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        if (isArray(value) && isArray(value[0]) && value[0].length === 2) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType())
;
