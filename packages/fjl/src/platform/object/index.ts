/**
 * Defines (object) platform functional method counter-parts used in the library.
 */

import {flip, flip3, flip4, flip5} from "../../function/flip";
import {Constructable, ObjectStatics} from "../../types";
import {isset} from "../../object/isset";

export const

  {assign, keys} = Object,

  instanceOf = (X: Constructable, x): boolean => x instanceof X,

  $instanceOf = (X: Constructable) => (x): boolean => x instanceof X,

  hasOwnProperty = <T extends object>(key: string | PropertyKey, x: T): boolean =>
    // @note `Object.hasOwn` cannot be used here until it is more broadly adopted (until node v24+ release etc.).
    isset(x) && Object.prototype.hasOwnProperty.call(x, key),

  $hasOwnProperty = <T extends object>(key: string | PropertyKey) =>
    (x: T): boolean => hasOwnProperty(key, x),

  /**
   * Contains all the static functions from `Object` but curried and flipped;
   *
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
      agg[key] = Object.is;
      agg[`$${key}`] = a => b => Object.is(a, b);
      return agg;
    }
    const operation = Object[key];
    let newOp;
    switch (operation.length) {
      case 2:
        newOp = flip(operation);
        agg[key] = newOp;
        agg[`$${key}`] = b => a => operation(a, b);
        break;
      case 3:
        newOp = flip3(operation);
        agg[key] = newOp;
        agg[`$${key}`] = c => b => a => operation(a, b, c);
        break;
      case 4:
        newOp = flip4(operation);
        agg[key] = newOp;
        agg[`$${key}`] = d => c => b => a => operation(a, b, c, d);
        break;
      case 5:
        newOp = flip5(operation);
        agg[key] = newOp;
        agg[`$${key}`] = e => d => c => b => a => operation(a, b, c, d, e);
        break;
      default:
        agg[key] = Object[key];
        break;
    }
    return agg;
  }, {}) as ObjectStatics

;
