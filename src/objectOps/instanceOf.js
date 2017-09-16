/**
 * Created by elydelacruz on 7/22/2017.
 */

import {curry} from   '../functionOps/curry';

import {instanceOf as pureInstanceOf} from '../uncurried/objectOps/instanceOf';

export const

    /**
     * Returns whether constructor has derived objectOps.
     * @instanceConstructor {Function|Class}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = curry(pureInstanceOf);
