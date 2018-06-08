import {_assignDeep} from './_assignDeep';
import {_hasOwnProperty, keys} from '../_jsPlatform/_object';
import {_foldl as foldl} from '../_listOps/_listOps';

export const

    _objUnion = (obj1, obj2) => _assignDeep(obj1, obj2),

    _objIntersect = (obj1, obj2) => foldl((agg, key) => {
        if (_hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1)),

    _objDifference = (obj1, obj2) => foldl((agg, key) => {
        if (!_hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1)),

    _objComplement = (obj0, ...objs) => foldl((agg, obj) =>
        _assignDeep(agg, _objDifference(obj, obj0)), {}, objs);
