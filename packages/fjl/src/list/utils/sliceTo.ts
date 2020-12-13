import {curry, CurryOf2} from "../../function/curry";
import {$slice,Slice} from "../../platform/slice";

export const

    /**
     * Slices from index `0` to given index.
     */
    $sliceTo = <T>(toInd: number, xs: Slice<T>): Slice<T> =>
        $slice(0, toInd, xs) as Slice<T>,

    /**
     * Slices from index `0` to given index.
     */
    sliceTo = curry($sliceTo) as CurryOf2<number, Slice<any>, Slice<any>>

;
