import {curry, curry2} from '../functionOps/curry';
import {assignDeep, hasOwnProperty, keys} from './objectPrelude';
import {reduce} from '../listOps/listOpsPrelude';

export const

    objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2)),

    objIntersect = curry((obj1, obj2) => reduce((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1))),

    objDifference = curry((obj1, obj2) => reduce((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1))),

    objComplement = curry2((obj0, ...objs) => reduce((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs));
