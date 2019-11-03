import {UnaryPred} from "../types";

export const

    /**
     * Returns whether `value` is 'falsy' or not
     * @function module:boolean.isFalsy
     * @param value
     * @returns {Boolean}
     */
    isFalsy: UnaryPred<any> = value => !value;
