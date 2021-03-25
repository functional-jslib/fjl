/**
 * Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import {curry, curry2, curry3, curry4, curry5, CurryOf2, CurryOf3, CurryOf4, CurryOf5} from "../../function/curry";
import {flip, flip3, flip4, flip5} from "../../function/flip";
import {Lengthable} from "../../types";
import {ObjectStatics} from "./types";

export * from './types';

export const

  {assign, keys} = Object,

  instanceOf = <T>(X: Function, x: T) => x instanceof X,

  $instanceOf = curry2(instanceOf),

  length = (x: Lengthable | undefined | null): number => x === null || x === undefined ? undefined : x.length,

  hasOwnProperty = <T>(key: string | PropertyKey, x: T): boolean =>
    Object.prototype.hasOwnProperty.call(x, key),

  $hasOwnProperty = curry2(hasOwnProperty),

  /**
   * Contains all the static functions from `Object` but curried and flipped;
   * ```
   * // E.g., `Object.defineProperties(obj, descriptor)` can now be used like
   * import {defineProperties} from 'fjl'
   * defineProperties(descriptor, someObj),
   * // Et. al.
   * ```
   */
  native: ObjectStatics = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
    if (typeof Object[key] !== 'function') {
      return agg;
    }
    if (key === 'is') { // should not flip `is` method (as it just compares `a` and `b`).
      agg[key] = curry(Object[key]);
      return agg;
    }
    const operation = Object[key];
    let newOp;
    switch (operation.length) {
      case 2:
        newOp = flip(operation);
        agg[key] = newOp;
        agg[`$${key}`] = curry2(newOp) as CurryOf2<any, any, any>;
        break;
      case 3:
        newOp = flip3(operation);
        agg[key] = newOp;
        agg[`$${key}`] = curry3(newOp) as CurryOf3<any, any, any, any>;
        break;
      case 4:
        newOp = flip4(operation);
        agg[key] = newOp;
        agg[`$${key}`] = curry4(newOp) as CurryOf4<any, any, any, any, any>;
        break;
      case 5:
        newOp = flip5(operation);
        agg[key] = newOp;
        agg[`$${key}`] = curry5(newOp) as CurryOf5<any, any, any, any, any, any>;
        break;
      default:
        agg[key] = Object[key];
        break;
    }
    return agg;
  }, {}) as ObjectStatics

;
