import {reduce} from "../list/utils";

export const mapObj = (fn, obj) =>
  reduce((agg, [key, value]) => {
    agg[key] = value;
  }, new obj.constructor(), obj.entries())
;
