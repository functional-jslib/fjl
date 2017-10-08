/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf objectOps
 */

import {curry} from   '../functionOps/curry';

import {instanceOf as _instanceOf} from '../uncurried/objectOps/instanceOf_';

export const

    /**
     * `instanceof` in function form.
     * @function module:objectOps.instanceOf
     * @param instance {*}
     * @param Type {Function}
     * @returns {Boolean}
     */
    instanceOf = curry(_instanceOf);
