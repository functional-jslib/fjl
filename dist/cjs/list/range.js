'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.range = undefined;

var _curry = require('../function/curry');

/**
 * Normalizes step for `from` and `to` combination.
 * @function module:list.normalizeStep
 * @param from {Number}
 * @param to {Number}
 * @param [step = 1] {Number}
 * @returns {Number}
 * @private
 */
var normalizeStep = function normalizeStep(from, to, step) {
    if (from > to) {
        return step > 0 ? -step : step; // make step negative
    }
    return step < 0 ? -1 * step : step; // make step positive
}; /**
    * @module object
    */
var

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
range = exports.range = (0, _curry.curry)(function (from, to) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var i = from;
    var out = [];
    step = normalizeStep(from, to, step);
    if (step === 0 || from === to) {
        return [from];
    }
    for (; (to - i) * step >= 0; i += step) {
        out.push(i);
    }
    return out;
});