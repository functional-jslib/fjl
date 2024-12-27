import {$assignDeep, assignDeep} from './assignDeep';
import {keys, hasOwnProperty} from '../_platform/object';
import {reduce} from '../list/utils';

export const

  objUnion = assignDeep,

  $objUnion = $assignDeep,

  objIntersect = <T extends object, T2 extends object>(
    obj1: T,
    obj2: T2
  ): { [index in keyof T]: any } =>
    reduce((agg, key) => {
      if (hasOwnProperty(obj2, key)) {
        agg[key] = obj2[key];
      }
      return agg;
    }, {}, keys(obj1)),

  $objIntersect = <T extends object, T2 extends object>(obj1: T) =>
    (obj2: T2): { [index in keyof T]: any } => objIntersect(obj1, obj2),

  objDifference = <T extends object, T2 extends object>(obj1: T, obj2: T2): { [index in keyof T]: any } =>
    reduce((agg, key: string) => {
      if (!hasOwnProperty(obj2, key)) {
        agg[key] = obj1[key];
      }
      return agg;
    }, {} as { [index in keyof T]: any }, keys(obj1)),

  $objDifference = <T extends object, T2 extends object>(obj1: T) =>
    (obj2: T2): { [index in keyof T]: any } => objDifference(obj1, obj2),

  objComplement = <T extends object, T2 extends object>(obj0: T, ...objs: T2[]): { [index in keyof T]: any } =>
    reduce((agg, obj) =>
      assignDeep(agg, objDifference(obj, obj0)), {} as { [index in keyof T]: any }, objs),

  $objComplement = <T extends object, T2 extends object>(obj0: T) =>
    (...objs: T2[]): { [index in keyof T]: any } => objComplement(obj0, ...objs)

;
