import {typeOf} from './typeOf';

export const

  /**
   * Converts incoming value to an array - Pairs up incoming value with
   * appropriate method (`Array.from`, `Object.entries`, etc.) based on incoming value.
   * For non parseable values (`NaN`, `null`, `undefined`, etc.) returns an empty array.
   *
   * @deprecated Use `Array.from`, an empty array, or `Object.entries` (directly)
   *  as needed.
   */
  toArray = (x: any): any[] => {
    switch (typeOf(x)) {
      case Promise.name:
      case Function.name:
      case Symbol.name:
      case Number.name:
      case 'NaN':
      case 'Null':
      case 'Undefined':
        return [];
      case String.name:
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
      case WeakMap.name:
      case WeakSet.name:
      case Map.name:
      case Set.name:
        return Array.from(x);
      case Object.name:
      default:
        return Object.entries(x);
    }
  }

;
