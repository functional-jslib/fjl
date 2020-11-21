import { lastIndex } from './utils';
/**
 * Returns last item of list.
 * @haskellType `last :: [a] -> a`
 * @function module:list.last
 * @param xs {Array|String}
 * @returns {*}
 */
export const last = xs => xs[lastIndex(xs)];
//# sourceMappingURL=last.js.map