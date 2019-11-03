import {UnaryPred} from "../types";

export const

    /**
     * Returns whether `value` is 'truthy' or not
     * @function module:boolean.isTruthy
     * @param value
     * @returns {Boolean}
     */
    isTruthy: UnaryPred<any> = value => !!value;
