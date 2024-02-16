/**
 * Defines (object) platform functional method counter-parts used in the library.
 */

import {flip, flip3, flip4, flip5} from "../../function/flip";
import {Constructable, ObjectStatics} from "../../types";

export const

  // @todo We shouldn' be returning these directly.
  {assign, keys} = Object,

  /**
   * Contains all the static functions from `Object` but curried and flipped;
   * Methods that only take one parameter, or only 'rest' args, are exported as is.
   *
   * ```typescript
   * // E.g., `Object.defineProperties(obj, descriptor)` can now be used flipped,
   * // and/or, curried:
   * import {defineProperties, $defineProperties} from 'fjl'
   *
   * // Flipped
   * defineProperties(descriptor, someObj),
   *
   * // Flipped and Curried
   * $defineProperties(descriptor)(someObj);
   *
   * // etc.
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
  }, {}) as ObjectStatics,

  instanceOf = (x: any, X: Constructable): boolean =>
    x.constructor === X || x instanceof X,

  $instanceOf = (x: any) => (X: Constructable): boolean => instanceOf(x, X),

  hasOwnProperty = Object.hasOwn ?? (<T extends object>(x: T, key: string | PropertyKey): boolean =>
    // @note `Object.hasOwn` cannot be used here until it is more broadly
    //   adopted (until node v24+ release etc.).
    Object.prototype.hasOwnProperty.call(x, key))
  ,

  $hasOwnProperty = <T extends object>(x: T) =>
    (key: string | PropertyKey): boolean => hasOwnProperty(x, key)

;
