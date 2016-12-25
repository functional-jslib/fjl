/**
 * Created by elyde on 12/10/2016.
 */

'use strict';

import assign from "./assign";

export function union (obj1, obj2) {
    return assign(obj1, obj2);
}

export function intersect (obj1, obj2) {
    return Object.keys(obj1).reduce((agg, key) => {
        if (obj2.hasOwnProperty(key)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {});
}

export function difference (obj1, obj2) {
    return Object.keys(obj1).reduce((agg, key) => {
        if (!obj2.hasOwnProperty(key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {});
}

export function complement (obj0, ...objs) {
    return objs.reduce((agg, obj) => {
        return assign(agg, difference(obj, obj0));
    }, {});
}

export default {
    complement,
    difference,
    intersect,
    union
};
