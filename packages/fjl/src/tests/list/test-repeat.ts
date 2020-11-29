import {repeat} from "../../list/repeat";
import {SliceOf} from "../../platform/slice";

describe('#repeat', () => {
    const arg = 'a';
    for (let i = 0; i < 5; i += 1) {
        const expected = new Array(i).fill(arg, 0, i).join(''),
            result = repeat(i, arg) as SliceOf<string>;
        ((_result, _expected): void => {
            it(`repeat(${i}, "${arg}") === "${_expected}"`, () => {
                expect(_result).toEqual(_expected.split(''));
            });
        })(result, expected);
    }
});
