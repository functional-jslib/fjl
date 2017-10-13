/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
import {curry2} from '../uncurried/functionOps/curry_';

import {call as _call} from '../uncurried/jsPlatform/function_';

export const

    /**
     * Functional `call` function (takes no context).
     * @function module:functionOps.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = curry2(_call);
