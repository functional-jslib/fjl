import {toCurried2Method} from "../../utils";
import {Filter} from "./types";

/**
 * Filters a functor (list etc.) with passed in function.
 */
const filter = toCurried2Method('filter') as Filter<any, any[]>;

export default filter;
