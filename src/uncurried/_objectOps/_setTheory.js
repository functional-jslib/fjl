import {assignDeep} from './_assignDeep';
import {hasOwnProperty, keys} from '../_jsPlatform/_object';
import {_foldl as foldl} from '../_listOps';

export const

    objUnion = (obj1, obj2) => assignDeep(obj1, obj2),

    objIntersect = (obj1, obj2) => foldl((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1)),

    objDifference = (obj1, obj2) => foldl((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1)),

    objComplement = (obj0, ...objs) => foldl((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs);
