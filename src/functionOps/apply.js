/**
 * Created by elydelacruz on 7/22/2017.
 */
import {curry} from './curry';

import {apply as pureApply} from '../jsPlatform/functionOpsUnCurried';

export const

    /**
     * Functional `apply` functionOps (takes no context).
     * @functionOps module:fnOperators.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = curry(pureApply);
