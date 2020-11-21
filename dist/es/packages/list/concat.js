import { length } from '../platform/object';
import { append } from './append';
import { sliceCopy } from './utils/sliceCopy';
export const 
/**
 * Concatenates all the elements of a container of lists.
 * @haskellType `concat :: Foldable t => t [a] -> [a]`
 * @function module:list.concat
 * @param xs {Array|String|*}
 * @returns {Array|String|*} - 'Cated' of passed in type.
 */
concat = (xs) => {
    let item0;
    switch (length(xs)) {
        case undefined:
        case 0:
            return [];
        case 1:
            item0 = xs[0];
            return item0 && item0.slice ? sliceCopy(item0) : item0;
        case 2:
        default:
            return append(...xs);
    }
};
//# sourceMappingURL=concat.js.map