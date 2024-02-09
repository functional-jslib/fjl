import {$assignDeep, assignDeep} from './assignDeep';
import {keys, hasOwnProperty} from '../platform/object';
import {reduce} from '../list/utils';

/**
 * @todo Method names here should have trailing 'Obj' suffix (instead
 *   of having it as a prefix) for all methods.
 */

export const

  objUnion = assignDeep,

  $objUnion = $assignDeep,

  objIntersect = <T extends object, T2 extends object>(
    obj1: T,
    obj2: T2
  ): { [index in keyof T] } =>
    reduce((agg, key) => {
      if (hasOwnProperty(obj2, key)) {
        agg[key] = obj2[key];
      }
      return agg;
    }, {}, keys(obj1)),

  $objIntersect = <T extends object, T2 extends object>(obj1: T) =>
    (obj2: T2): { [index in keyof T] } => objIntersect(obj1, obj2),

  objDifference = <T extends object, T2 extends object>(obj1: T, obj2: T2): { [index in keyof T] } =>
    reduce((agg, key: string) => {
      if (!hasOwnProperty(obj2, key)) {
        agg[key] = obj1[key];
      }
      return agg;
    }, {} as { [index in keyof T] }, keys(obj1)),

  $objDifference = <T extends object, T2 extends object>(obj1: T) =>
    (obj2: T2): { [index in keyof T] } => objDifference(obj1, obj2),

  objComplement = <T extends object, T2 extends object>(obj0: T, ...objs: T2[]): { [index in keyof T] } =>
    reduce((agg, obj) =>
      assignDeep(agg, objDifference(obj, obj0)), {} as { [index in keyof T] }, objs),

  $objComplement = <T extends object, T2 extends object>(obj0: T) =>
    (...objs: T2[]): { [index in keyof T] } => objComplement(obj0, ...objs)

;
