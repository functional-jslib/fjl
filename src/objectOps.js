/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

import {assignDeep} from './assign';
import {curry2} from './curry';

export let

    hasOwnProperty = curry2((x, propName) => Object.prototype.hasOwnProperty.call(x, propName)),

    toString = obj => obj.toString(),

    length = x => x.length,

    keys = x => Object.keys(x),

    union = curry2((obj1, obj2) => assignDeep(obj1, obj2)),

    intersect = curry2((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
            if (hasOwnProperty(obj2, key)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {})),

    difference = curry2((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
            if (!hasOwnProperty(obj2, key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {})),

    complement = curry2((obj0, ...objs) => objs.reduce((agg, obj) => {
            return assignDeep(agg, difference(obj, obj0));
        }, {}));

export default {
    hasOwnProperty,
    length,
    complement,
    difference,
    intersect,
    union
};
