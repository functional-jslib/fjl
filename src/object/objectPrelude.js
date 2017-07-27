/**
 * Created by elydelacruz on 7/22/2017.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

import {curry, curry2} from '../function/curry';
import {isObject} from './is';
import {fPureTakesOne} from '../utils/utils';

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

export {instanceOf} from './instanceOf';

export const

    prop = curry((name, obj) => obj[name]),

    hasOwnProperty = fPureTakesOne('hasOwnProperty'),

    length = prop('length'),

    keys = obj => Object.keys(obj),

    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:assign.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = curry2(defineAssign()),

    /**
     * Merges all objects down into one.
     * @function module:assign.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = curry2((obj0, ...objs) =>
        objs.reduce((topAgg, obj) => {
            return keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (hasOwnProperty(key, agg) && propDescription &&
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
        }, obj0));
