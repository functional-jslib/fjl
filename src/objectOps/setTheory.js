import {curry, curry2} from   '../uncurried/functionOps/curry_';
import {hasOwnProperty, keys} from '../uncurried/jsPlatform/object_';
import {assignDeep} from '../uncurried/objectOps/assignDeep_';
import {foldl} from '../listOps';

export const

    objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2)),

    objIntersect = curry((obj1, obj2) => foldl((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1))),

    objDifference = curry((obj1, obj2) => foldl((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1))),

    objComplement = curry2((obj0, ...objs) => foldl((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs));
