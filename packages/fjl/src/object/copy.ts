import {typeOf} from './typeOf';
import {of} from './of';
import {id} from "../function/id";

export const

  /**
   * @deprecated use `structuredClone`, or existing object methods,
   * etc., instead.
   *
   * Make a copy of a value or optionally copy incoming value onto an
   * outgoing value (second parameter).
   *
   * @note If incoming value is an immutable primitive (string, number,
   * symbol, NaN, null, undefined, boolean)
   * it gets returned as is.
   */
  copy = <T>(x, out?: any): T => {
    // if falsy value (immutable primitive) return it
    if (!x) return x;

    switch (typeOf(x)) {
      // If immutable primitive, return it
      case Symbol.name:
      case Boolean.name:
      case String.name:
      case Number.name:
      case 'NaN':
        return x;

      case Array.name:
      case Int8Array.name:
      case Int16Array.name:
      case Int32Array.name:
      case Float32Array.name:
      case Float64Array.name:
      case Uint8Array.name:
      case Uint8ClampedArray.name:
      case Uint16Array.name:
      case Uint32Array.name:
        return !out ? x.slice(0) : out.concat(x);

      case Function.name:
        return ((...args: any[]) => x(...args)) as unknown as T;

      case Promise.name:
        return x.then(id) as unknown as T;

      case Map.name:
      case Set.name:
      case WeakMap.name:
      case WeakSet.name:
        return new x.constructor(Array.from(x));

      // Else make copy
      default:
        // @todo Upgrade this (in a future release) to use `structuredClone`.
        return Object.assign(!out ? of(x) : out, x);
    }
  }
;
