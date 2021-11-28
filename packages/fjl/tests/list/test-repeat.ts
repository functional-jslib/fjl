import {repeat} from "../../src/list/repeat";
import {Slice} from "../../src/types/data";

describe('#repeat', () => {
    const arg = 'a';
    for (let i = 0; i < 5; i += 1) {
        const expected = new Array(i).fill(arg, 0, i).join(''),
            result = repeat(i, arg) as Slice<string>;
        ((_result, _expected): void => {
            it(`repeat(${i}, "${arg}") === "${_expected}"`, () => {
                expect(_result).toEqual(_expected.split(''));
            });
        })(result, expected);
    }
});
