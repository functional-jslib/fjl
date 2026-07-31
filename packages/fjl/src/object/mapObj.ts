import {reduce} from "../list/utils";
import {Ternary} from "../types";
import {of} from "./of";

/**
 * @deprecated Map over/reduce object's entries, values, and/or, keys,
 * (directly) as required.
 *
 * Maps a function over an objects own key, and values.
 */
export const mapObj = <T extends object>(fn: Ternary<any, string, T>, obj: T): T =>
  reduce((agg, [key, value]) => {
    agg[key] = fn(value, key, obj);
    return agg;
  }, of(obj), Object.entries(obj))
;
