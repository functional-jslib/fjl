import {cycle} from "../../src/list/cycle";
import {SliceOf} from "../../src/platform/slice";

describe('#cycle', () => {
    const arg = ['a'];
    for (let i = 0; i < 5; i += 1) {
        const expected = new Array(i).fill(arg, 0, i).flatMap(xs => xs),
            result = cycle(i, arg) as SliceOf<string[]>;
        ((_result, _expected): void => {
            it(`cycle(${i}, ["${arg.join('", "')}"]) === ["${_expected.join('", "')}"]`, () => {
                expect(_result).toEqual(_expected);
            });
        })(result, expected);
    }
});
