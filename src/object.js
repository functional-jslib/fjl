/**
 * Created by elydelacruz on 7/22/2017.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

import {curry, curry2} from './curry';
import {keys} from './keys';
import {isObject} from './is';
import {reduce} from './purePrelude';

/**
 * @returns {Function}
 */
function defineAssign () {
    if (Object.assign) {
        return (obj0, ...objs) => Object.assign(obj0, ...objs);
    }
    return (obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0);
}

export const

    hasOwnProperty = curry((propName, x) => x.hasOwnProperty(propName)),

    length = x => x.length,

    /**
     * Merges all objects down into one.
     * @function module:assign.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) => {
            return keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (agg.hasOwnProperty(key) && propDescription &&
                    !(propDescription.get && propDescription.set) &&
                    !propDescription.writable) {
                    return agg;
                }
                if (isObject(agg[key]) && isObject(obj[key])) {
                    assignDeep(agg[key], obj[key]);
                }
                else {
                    agg[key] = obj[key];
                }
                return agg;
            }, topAgg);
        }, obj0),

    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:assign.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = defineAssign(),

    union = curry((obj1, obj2) => assignDeep(obj1, obj2)),

    intersect = curry((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
        if (hasOwnProperty(obj2, key)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {})),

    difference = curry((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
        if (!hasOwnProperty(obj2, key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {})),

    complement = curry2((obj0, ...objs) => objs.reduce((agg, obj) => {
        return assignDeep(agg, difference(obj, obj0));
    }, {}));
