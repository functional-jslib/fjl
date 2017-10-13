/**
 * @memberOf functionOps
 */
import {curry} from '../uncurried/functionOps/curry_';

import {until as _until} from '../uncurried/functionOps/until_';

export const

    /**
     * Run `operation` `until` predicate returns `true`.
     * @function module:functionOps.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     * @curried
     */
    until = curry(_until);
