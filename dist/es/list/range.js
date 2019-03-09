"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../function/curry");
const normalizeStep = (from, to, step) => {
    if (from > to) {
        return step > 0 ? -step : step;
    }
    return step < 0 ? -1 * step : step;
};
exports.range = curry_1.curry((from, to, step = 1) => {
    let i = from;
    const out = [];
    step = normalizeStep(from, to, step);
    if (step === 0 || from === to) {
        return [from];
    }
    for (; (to - i) * step >= 0; i += step) {
        out.push(i);
    }
    return out;
});
//# sourceMappingURL=range.js.map