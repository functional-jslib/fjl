/**
 * @module object
 */
import {curry} from '../function/curry';

/**
 * Normalizes step for `from` and `to` combination.
 * @function module:list.normalizeStep
 * @param from {Number}
 * @param to {Number}
 * @param [step = 1] {Number}
 * @returns {Number}
 * @private
 */
const normalizeStep = (from, to, step) => {
    if (from > to) {
        return step > 0 ? -step : step; // make step negative
    }
    return step < 0 ? -1 * step : step; // make step positive
};

export const

    /**
     * @note normalizes `step` to be of valid
     *  direction (negative if range required is in the negative direction
     *  and positive otherwise).
     * @function module:list.range
     * @param from {Number}
     * @param to {Number}
     * @param [step = 1] {Number}
     * @returns {Array.<Number>}
     */
    range = curry((from, to, step = 1) => {
        let i = from;
        const out = [];
        step = normalizeStep(from, to, step);
        if (step === 0 || from === to) { return [from]; }
        for (; (to - i) * step >= 0; i += step) { out.push(i); }
        return out;
    })
;
