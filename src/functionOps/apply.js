/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
import {curry} from '../uncurried/functionOps/curry_';

import {apply as _apply} from '../uncurried/jsPlatform/function_';

export const

    /**
     * Functional `apply` functionOps (takes no context).
     * @function module:functionOps.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = curry(_apply);
