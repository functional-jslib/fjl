import {assignDeep} from './assignDeep';
import {hasOwnProperty, keys} from '../jsPlatform/object';
import {_foldl} from '../list/list';
import {curry} from '../function/curry';

export const

    objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2)),

    objIntersect = curry((obj1, obj2) => _foldl((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1))),

    objDifference = curry((obj1, obj2) => _foldl((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1))),

    objComplement = curry((obj0, ...objs) => _foldl((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs));
