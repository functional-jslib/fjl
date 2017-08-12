/**
 * Created by elydelacruz on 7/22/2017.
 */
import {curry2} from './curry';

export const

    /**
     * Functional `call` functionOps (takes no context).
     * @functionOps module:fnOperators.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = curry2((fn, ...args) => fn.call(null, ...args));
