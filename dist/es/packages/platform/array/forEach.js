import { toCurried2Method } from "../../utils";
/**
 * Functional `for each` for given functor (Array|Object|etc.).
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
const forEach = toCurried2Method('forEach');
export default forEach;
//# sourceMappingURL=forEach.js.map