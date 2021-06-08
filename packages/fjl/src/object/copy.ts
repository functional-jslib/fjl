import {typeOf} from './typeOf';
import {of} from './of';
import {id} from "../function/id";

export const

  /**
   * Make a copy of a value or optionally copy incoming value onto an outgoing value (second parameter).
   * @note If incoming value is an immmutable primitive (string, number, symbol, NaN, null, undefined, boolean)
   *  it gets returned as is.
   */
  copy = <T>(x, out?: any): T => {
    // if `null`, `undefined`, `''`, `0`, `false` return
    if (!x) {
      return x;
    }

    switch (typeOf(x)) {
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
        return !out ? x.slice(0) : Object.assign(out, x);

      // If immutable primitive, return it
      case Symbol.name:
      case Boolean.name:
      case String.name:
      case Number.name:
      case 'NaN':
        return x;

      case Function.name:
        return ((...args: any[]) => x(...args)) as unknown as T;

      case Promise.name:
        return x.then(id) as unknown as T;

      case 'Map':
      case 'Set':
      case 'WeakMap':
      case 'WeakSet':
        return new x.constructor(Array.from(x));

      // Else make copy
      default:
        return Object.assign(!out ? of(x) : out, x);
    }
  }
;
