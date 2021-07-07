import {Slice} from "../../types";
import {sliceFrom} from "./sliceFrom";

export const

    /**
     * Returns a copy of a slice (E.g., an array and/or a string).
     */
    sliceCopy = <T extends Slice>(xs: T): T => sliceFrom(0, xs)

;
