import {reduce} from "../list/utils";

/**
 * @deprecated Map over/reduce objects entries, values, and/or, keys,
 * (directly) as required.
 *
 * Maps a function over an objects own key, and values.
 */
export const mapObj = (fn, obj) =>
  reduce((agg, [key, value]) => {
    agg[key] = fn(value, key, obj);
    return agg;
  }, new obj.constructor(), obj.entries())
;
