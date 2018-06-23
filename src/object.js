/**
 * @module object
 */
import {curry, curry2} from './uncurried/_functionOps/_curry';
import {_instanceOf, _hasOwnProperty, _assign} from './uncurried/_jsPlatform/_object';
import {_prop, _isType} from './uncurried/_object/_object';
import {_assignDeep} from './uncurried/_object/_assignDeep';
import {
    _objUnion, _objComplement, _objIntersect, _objDifference}
    from './uncurried/_object/_setTheory';

export * from './uncurried/_object/_object';

export {length, keys} from './uncurried/_jsPlatform/_object';

export const

    /**
     * Gives `undefined` or prop value if it is available.
     * @function module:object.prop
     * @param propName {String}
     * @param obj {*} - Object to search.
     * @returns {*|undefined}
     * @curried
     */
    prop = curry(_prop),

    /**
     * `instanceof` in function form.
     * @function module:object.instanceOf
     * @param instance {*}
     * @param Type {Function}
     * @returns {Boolean}
     * @curried
     */
    instanceOf = curry(_instanceOf),

    /**
     * `hasOwnProperty` as a method (takes object last).
     * @function module:object.hasOwnProperty
     * @param propName {String}
     * @param obj {*} - Object to search.
     * @returns {Boolean}
     * @curried
     */
    hasOwnProperty = curry(_hasOwnProperty),

    /**
     * `Object.assign` if it is available else a shim.
     * @function module:object.assign
     * @param [...obj]{Object} - One or more objects to merge onto first object.
     * @returns {Object}
     * @curried - Called after having two or more args
     */
    assign = curry2(_assign),

    /**
     * Same as `Object.assign` except does a deep merge.
     * @function module:object.assignDeep
     * @param [...obj]{Object} - One or more objects to deep merge onto first object.
     * @returns {Object}
     * @curried - Called after having two or more args
     */
    assignDeep = curry2(_assignDeep),

    /**
     * Cartesian union for objects (operates on two objects).
     * @function module:object.objUnion
     * @param obj1 {Object}
     * @param obj2 {Object}
     * @returns {Object} - Unified obj.
     * @curried
     */
    objUnion = curry(_objUnion),

    /**
     * Returns the cartesian intersection of two objects.
     * @function module:object.objIntersect
     * @param obj1 {Object}
     * @param obj2 {Object}
     * @returns {Object} - Intersection of given objects.
     * @curried
     */
    objIntersect = curry(_objIntersect),

    /**
     * Returns the cartesian difference of two objects.
     * @function module:object.objDifference
     * @param obj1 {Object}
     * @param obj2 {Object}
     * @returns {Object} - Difference of given objects.
     * @curried
     */
    objDifference = curry(_objDifference),

    /**
     * Returns the cartesian complement of one or more objects on given object.
     * @function module:object.objDifference
     * @param obj {Object}
     * @param [...obj]{Object} - One or more objects to calculate complement from.
     * @returns {Object} - Complement of given objects.
     * @curried
     */
    objComplement = curry2(_objComplement),

    /**
     * Returns a boolean indicating whether a value is of given type or not.
     * @function module:object.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = curry(_isType)

;
