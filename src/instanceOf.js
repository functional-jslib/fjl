/**
 * Created by elydelacruz on 7/22/2017.
 */

import {curry} from './curry';

export const

    /**
     * Returns whether constructor has derived object.
     * @instanceConstructor {Function|Class}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = curry((instanceConstructor, instance) =>
        instance instanceof instanceConstructor);
