import {toCurriedOneOrMoreMethod} from "../../utils/fnl-method-proxies";
import {ConcatFunc} from "./types";

/**
 * Concatenates all passed slice likes onto the end of the first one.
 * @function module:jsPlatform.concat
 * @param s {Array|String|Slice|*} - Slice.
 * @param ss {...(Array|String|Slice|*)} - One or more slices.
 * @return {Array|String|*} - Same type as passed in value.
 */
const concat: ConcatFunc =
    toCurriedOneOrMoreMethod('concat') as ConcatFunc;

export default concat;
