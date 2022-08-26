import {reduce} from "../list/utils";

export const mapObj = (fn, obj) =>
  reduce((agg, [key, value]) => {
    agg[key] = fn(value, key, obj);
    return agg;
  }, new obj.constructor(), obj.entries())
;
