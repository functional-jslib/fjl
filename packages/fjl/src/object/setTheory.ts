import {assignDeep} from './assignDeep';
import {keys, hasOwnProperty} from '../platform/object';
import {reduce} from '../list/utils';
import {curry, curry2} from '../function/curry';

export const

  objUnion = assignDeep,

  $objUnion = curry2(objUnion),

  objIntersect = <T, T2>(obj1: T, obj2: T2) => reduce((agg, key: keyof T) => {
    if (hasOwnProperty(key, obj2)) {
      agg[key] = obj2[key as unknown as keyof T2];
    }
    return agg;
  }, {} as { [index in keyof T] }, keys(obj1)),

  $objIntersect = curry(objIntersect),

  objDifference = <T, T2>(obj1: T, obj2: T2) => reduce((agg, key: keyof T) => {
    if (!hasOwnProperty(key, obj2)) {
      agg[key] = obj1[key];
    }
    return agg;
  }, {} as { [index in keyof T] }, keys(obj1)),

  $objDifference = curry(objDifference),

  objComplement = <T, T2>(obj0: T, ...objs: T2[]) => reduce((agg, obj) =>
    assignDeep(agg, objDifference(obj, obj0)), {} as { [index in keyof T] }, objs),

  $objComplement = curry2(objComplement);
