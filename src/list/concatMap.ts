import {curry, CurryOf2} from "../function/curry";
import {concat} from "./concat";
import {map} from "./map";
import {MapOp} from "../jsPlatform/array";
import {SliceOf} from "../jsPlatform/slice/types";

export const
    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:list.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array}
     * @returns {Array}
     */
    concatMap = curry((fn, foldableOfA) => concat(map(fn, foldableOfA))) as
        CurryOf2<MapOp<any, SliceOf<any>, any>, SliceOf<any>[], SliceOf<any>>;
