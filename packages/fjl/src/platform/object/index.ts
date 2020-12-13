/**
 * Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import {HasOwnPropertyFunc, InstanceOfFunc} from "./types";
import {curry, curry2, CurryOf2, CurryOf3, CurryOf4, CurryOf5} from "../../function/curry";
import {Lengthable} from "../../types";
import {flip, flip3, flip4, flip5} from "../../function";
import {ObjectStatics} from "./types";

export * from './types';

export const

  {assign, keys} = Object,

  instanceOf = curry2(<T>(X: Function, x: T) => x instanceof X) as InstanceOfFunc,

  length = (x: Lengthable | undefined | null): number => x === null || x === undefined ? undefined : x.length,

  hasOwnProperty: HasOwnPropertyFunc = curry2(<T>(propKey: string, x: T): boolean =>
    Object.prototype.hasOwnProperty.call(x, propKey)),

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
    switch (operation.length) {
      case 2:
        agg[key] = flip(operation) as CurryOf2<any, any, any>;
        break;
      case 3:
        agg[key] = flip3(operation) as CurryOf3<any, any, any, any>;
        break;
      case 4:
        agg[key] = flip4(operation) as CurryOf4<any, any, any, any, any>;
        break;
      case 5:
        agg[key] = flip5(operation) as CurryOf5<any, any, any, any, any, any>;
        break;
      default:
        agg[key] = Object[key];
        break;
    }
    return agg;
  }, {}) as ObjectStatics

;
