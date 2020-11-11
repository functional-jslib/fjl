import {toCurried3Method} from "../../utils";
import {Reduce} from "./types";

/**
 * Functional reduce.  Same as `[].reduce` except it takes The reduction function first,
 *  the functor second, and a zero value as third.
 */
const reduce = toCurried3Method('reduce') as Reduce<any, any[], any>;

export default reduce;
