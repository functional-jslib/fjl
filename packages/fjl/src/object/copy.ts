import {typeOf} from './typeOf';
import {of} from './of';
import {id} from "../function/id";
import {Constructable} from "../types";

export const

  /**
   * @deprecated use `structuredClone`, or existing `assignDeep`, and/or `Object.assign` instead.
   *
   * Make a copy of incoming value, if it is an object, array, typed array, a collection, a function, and/or a Promise.
   * Optionally copy said value onto `out`going value (if incoming value is an object type value (
   *  array, typed array, collection, Promise, and/or function).
   *
   * @note If incoming value is an immutable primitive (string, number, symbol, NaN, null, undefined, boolean)
   * it gets returned as is.
   */
  copy = <T>(x: T, out?: T): T => {
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
        return (!out ? (x as any[]).slice(0) : (out as any[]).concat(x)) as T;

      case Int8Array.name:
      case Int16Array.name:
      case Int32Array.name:
      case Float32Array.name:
      case Float64Array.name:
      case Uint8Array.name:
      case Uint8ClampedArray.name:
      case Uint16Array.name:
      case Uint32Array.name:
        return (!out ? (x.constructor as Constructable & {from: (_x: any) => T}).from(x) :
          (out as Constructable & {from: (_x: any) => T}).from(x)) as T;

      case Function.name:
        return Object.assign((...args: any[]) => (x as CallableFunction)(...args), x) as T;

      case Promise.name:
        return (out ? (out as Promise<any>).then(() => x) :
          (x as Promise<any>).then(id)) as unknown as T;

      case Map.name:
      case Set.name:
      case WeakMap.name:
      case WeakSet.name:
        if (x instanceof Map || x instanceof WeakMap) {
          if (out) {
            for (const [key, value] of x[Symbol.iterator]())
              (out as Map<any, any>).set(key, value);
            return out as T;
          }
          return new (x.constructor as Constructable)(Array.from(x as unknown as Iterable<any>));
        } else if (x instanceof Set || x instanceof WeakSet) {
          if (out) {
            for (const value of x[Symbol.iterator]())
              (out as Set<any>).add(value);
            return out as T;
          }
          return new (x.constructor as Constructable)(Array.from(x as unknown as Iterable<any>));
        }
        // Else here not expected to be reached;  Statement is here only to appease type checker.
        else {
          return x; // `switch` statement fall-through handling
        }

      // Else make copy
      default:
        // @todo Use `assignDeep` until `structuredClone` is more widely adopted.
        // @todo Upgrade this (in a future release) to use `structuredClone`.
        return Object.assign(!out ? of(x) : out, x);
    }
  }
;
