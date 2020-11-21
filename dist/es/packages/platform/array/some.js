import { toCurried2Method } from "../../utils";
/**
 * Returns `true` if `fn` (predicate) returns true for at least one item
 * in functor else returns `false`.
 * @throws {Error} - When passed in object doesn't have a `some` method.
 */
const some = toCurried2Method('some');
export default some;
//# sourceMappingURL=some.js.map