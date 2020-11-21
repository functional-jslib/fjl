/**
 * Returns whether constructor has derived object.
 * @function module:platform/object.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
import { curry } from "../../function/curry";
const instanceOf = curry((X, x) => x instanceof X);
export default instanceOf;
//# sourceMappingURL=instanceOf.js.map