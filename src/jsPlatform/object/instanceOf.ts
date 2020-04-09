/**
 * Returns whether constructor has derived object.
 * @function module:jsPlatform/object.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
import {curry} from "../../function/curry";
import {InstanceOfFunc} from "./types";

const instanceOf = curry((X: Function, x: any) => x instanceof X) as InstanceOfFunc;

export default instanceOf;
