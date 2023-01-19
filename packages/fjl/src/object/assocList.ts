/**
 * @todo Should be using new methods here (Object.fromEntries, etc.) and deprecating existing ones (in favor of fjl.native.*, and or natively built-in ones).
 */
import {isArray} from './is';
import {keys} from '../platform/object';
import {TypeConstructor} from "../types";
import {map} from "../list/map";
import {foldl} from "../list/foldl";

export const

  /**
   * Returns an associated list from given object.
   */
  toAssocList = <T>(obj: T): [keyof T, any][] => Object.entries(obj) as [keyof T, any][],

  /**
   * Returns a deep associated list from given object, on incoming `TypeConstraint` constructor.
   */
  toAssocListDeep = (obj, TypeConstraint: TypeConstructor = Object) =>
    map(key =>
        TypeConstraint === obj[key]?.constructor ?
          [key, toAssocListDeep(obj[key], TypeConstraint)] :
          [key, obj[key]],
      keys(obj)
    ),

  /**
   * From associated list to zero object.
   */
  fromAssocList = (xs, zero = {}) => foldl((agg, [key, value]) => {
    agg[key] = value;
    return agg;
  }, zero, xs),

  /**
   * From associated list to object (deep conversion on associative lists (array of 2 value arrays)).
   */
  fromAssocListDeep = (xs, OutType = Object) => foldl((agg, [key, value]) => {
    if (isArray(value) && isArray(value[0]) && value[0].length === 2) {
      agg[key] = fromAssocListDeep(value, OutType);
      return agg;
    }
    agg[key] = value;
    return agg;
  }, new OutType(), xs)
;
