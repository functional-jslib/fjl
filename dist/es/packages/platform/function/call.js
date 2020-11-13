import { curry2 } from '../../function/curry';
/**
 * Functional `call` function (takes no context).
 * @deprecated
 */
const call = curry2((fn, ...args) => fn(...args));
export default call;
//# sourceMappingURL=call.js.map