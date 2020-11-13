import { curry2 } from '../../function/curry';
const 
/**
 * Functional `apply` function (takes no context).
 * @deprecated
 */
apply = curry2((fn, args) => fn(...args));
export default apply;
//# sourceMappingURL=apply.js.map