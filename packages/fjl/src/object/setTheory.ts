import {$assignDeep, assignDeep} from './assignDeep';
import {keys, hasOwnProperty} from '../platform/object';
import {reduce} from '../list/utils';

export const

  objUnion = assignDeep,

  $objUnion = $assignDeep,

  objIntersect = <T, T2>(obj1: T, obj2: T2): { [index in keyof T] } =>
    reduce((agg, key: keyof T) => {
      if (hasOwnProperty(key, obj2)) {
        agg[key] = obj2[key as unknown as keyof T2];
      }
      return agg;
    }, {} as { [index in keyof T] }, keys(obj1)),

  $objIntersect = <T, T2>(obj1: T) =>
    (obj2: T2): { [index in keyof T] } => objIntersect(obj1, obj2),

  objDifference = <T, T2>(obj1: T, obj2: T2): { [index in keyof T] } =>
    reduce((agg, key: keyof T) => {
      if (!hasOwnProperty(key, obj2)) {
        agg[key] = obj1[key];
      }
      return agg;
    }, {} as { [index in keyof T] }, keys(obj1)),

  $objDifference = <T, T2>(obj1: T) =>
    (obj2: T2): { [index in keyof T] } => objDifference(obj1, obj2),

  objComplement = <T, T2>(obj0: T, ...objs: T2[]): { [index in keyof T] } =>
    reduce((agg, obj) =>
      assignDeep(agg, objDifference(obj, obj0)), {} as { [index in keyof T] }, objs),

  $objComplement = <T, T2>(obj0: T) =>
    (...objs: T2[]): { [index in keyof T] } => objComplement(obj0, ...objs)

;
