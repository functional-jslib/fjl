
import {curry, curry2} from '../src/curry';

export const

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
