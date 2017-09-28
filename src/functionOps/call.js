/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
import {curry2} from './curry';

import {call as pureCall} from   '../uncurried/jsPlatform/functionOpsUncurried';

export const

    /**
     * Functional `call` function (takes no context).
     * @function module:functionOps.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = curry2(pureCall);
