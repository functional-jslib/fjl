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

const

    /**
     * Range function - gives you an array contain numbers in given range.
     * @note normalizes `step` to be valid if range numbers given are invalid
     *  (forces `step` to be negative if range required is in the negative direction
     *  and forces `step` to be positive if range required is in the other direction).
     * @function module:list.range
     * @param from {Number}
     * @param to {Number}
     * @param [step = 1] {Number}
     * @returns {Array.<Number>}
     */
    range = curry((from: number, to: number, step: number = 1): number[] => {
        let i = from;
        const out: number[] = [];
        step = normalizeStep(from, to, step);
        if (step === 0 || from === to) { return [from]; }
        for (; (to - i) * step >= 0; i += step) { out.push(i); }
        return out;
    })
;

export {range};
