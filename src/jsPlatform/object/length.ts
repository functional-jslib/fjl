/**
 * @function module:jsPlatform/object.length
 * @param x {{length: number}}
 * @returns {Number}
 */
import {Lengthable} from "../../types";

const length = (x: Lengthable | undefined | null): number => !x ? 0 : x.length;

export default length;
