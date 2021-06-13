import {Slice} from "../../types";
import {sliceFrom} from "./sliceFrom";

export const

    /**
     * Returns a copy of a slice (E.g., an array and/or a string).
     */
    sliceCopy = <T>(xs: Slice<T>): Slice<T> => sliceFrom(0, xs)

;
