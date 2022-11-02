import {typeOf} from './typeOf';
import {toAssocList} from './assocList';

export const

  /**
   * Converts incoming value to an array.
   * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
   * @note For `null`, `undefined`, `NaN`, `Number{}`, `Symbol{}`, `Boolean{}` returns an empty array.
   * @note Method does a shallow conversion;
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
        return toAssocList(x);
    }
  }

;
