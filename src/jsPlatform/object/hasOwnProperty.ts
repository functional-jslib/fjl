import {toCurried2Method} from "../../utils";
import {HasOwnPropertyFunc} from "./types";

/**
 * @function module:jsPlatform/object.hasOwnProperty
 * @param propName {*}
 * @param typeInstance {*}
 * @returns {Boolean}
 * @deprecated - Use property directly instead.
 */
const hasOwnProperty: HasOwnPropertyFunc = toCurried2Method('hasOwnProperty') as HasOwnPropertyFunc;

export default hasOwnProperty;
