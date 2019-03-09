import { assignDeep } from './assignDeep';
import { keys } from '../jsPlatform/object';
import { reduce } from '../list/utils';
import { curry, curry2 } from '../function/curry';
export const objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2)), objIntersect = curry((obj1, obj2) => reduce((agg, key) => {
    if (obj2.hasOwnProperty(key)) {
        agg[key] = obj2[key];
    }
    return agg;
}, {}, keys(obj1))), objDifference = curry((obj1, obj2) => reduce((agg, key) => {
    if (!obj2.hasOwnProperty(key)) {
        agg[key] = obj1[key];
    }
    return agg;
}, {}, keys(obj1))), objComplement = curry2((obj0, ...objs) => reduce((agg, obj) => assignDeep(agg, objDifference(obj, obj0)), {}, objs));
//# sourceMappingURL=setTheory.js.map