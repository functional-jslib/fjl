import {toCurriedOneOrMoreMethod} from "../../utils/fnl-method-proxies";
import {ConcatFunc} from "./types";

/**
 * Concatenates all passed slice likes onto the end of the first one.
 * @function module:platform.concat
 * @param s {Array|String|SliceOf<any>|*} - Slice.
 * @param ss {...(Array|String|SliceOf<any>>|*)} - One or more slices.
 * @return {Array|String|*} - Same type as passed in value.
 */
const concat: ConcatFunc<unknown> =
    toCurriedOneOrMoreMethod('concat') as ConcatFunc<unknown>;

export default concat;
