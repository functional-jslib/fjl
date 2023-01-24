/**
 * Defines (object) platform functional method counter-parts used in the library.
 */

import {flip, flip3, flip4, flip5} from "../../function/flip";
import {Constructable, ObjectStatics} from "../../types";
import {isset} from "../../object/isset";

export const

  // @todo We shouldn' be returning these directly.
  {assign, keys} = Object,

  /**
   * @todo Method should take object as first argument.
   */
  instanceOf = (X: Constructable, x): boolean =>
    isset(x) && x.constructor === X || x instanceof X, // @todo remove null check (isset) here (in future release).

  $instanceOf = (X: Constructable) => (x): boolean => instanceOf(X, x),

  /**
   * @todo Method should take object as first argument.
   */
  hasOwnProperty = <T extends object>(key: string | PropertyKey, x: T): boolean =>
    // @note `Object.hasOwn` cannot be used here until it is more broadly
    //   adopted (until node v24+ release etc.).
    isset(x) && Object.prototype.hasOwnProperty.call(x, key) // @todo shouldn't be checking for null/undefined here
  ,

  $hasOwnProperty = <T extends object>(key: string | PropertyKey) =>
    (x: T): boolean => hasOwnProperty(key, x),

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
  }, {}) as ObjectStatics

;
