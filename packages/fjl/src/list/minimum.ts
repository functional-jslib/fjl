import {head} from "./head";
import {sortBy} from "./sortBy";
import {genericAscOrdering} from "./utils";

export const
    /**
     * Returns the smallest element in a non-empty structure of elements.
     */
    minimum = <T>(list: T[]): T => head(sortBy(genericAscOrdering, list));
