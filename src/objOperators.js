/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

import {assignDeep} from './assign';

export let

    hasOwnProperty = (x, propName) => Object.prototype.hasOwnProperty.call(x, propName),

    union = (obj1, obj2) => {
        return assignDeep(obj1, obj2);
    },

    intersect = (obj1, obj2) => {
        return Object.keys(obj1).reduce((agg, key) => {
            if (hasOwnProperty(obj2, key)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {});
    },

    difference = (obj1, obj2) => {
        return Object.keys(obj1).reduce((agg, key) => {
            if (!hasOwnProperty(obj2, key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {});
    },

    complement = (obj0, ...objs) => {
        return objs.reduce((agg, obj) => {
            return assignDeep(agg, difference(obj, obj0));
        }, {});
    };

export default {
    hasOwnProperty,
    complement,
    difference,
    intersect,
    union
};
