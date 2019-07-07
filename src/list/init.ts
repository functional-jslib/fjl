import {lastIndex} from './utils';

export const
    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:list.init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    init = xs => xs.slice(0, lastIndex(xs));
