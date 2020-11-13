import { cycle } from "../../packages/list/cycle";
describe('#cycle', () => {
    const arg = ['a'];
    for (let i = 0; i < 5; i += 1) {
        const expected = new Array(i).fill(arg, 0, i).flatMap(xs => xs), result = cycle(i, arg);
        ((_result, _expected) => {
            it(`cycle(${i}, ["${arg.join('", "')}"]) === ["${_expected.join('", "')}"]`, () => {
                expect(_result).toEqual(_expected);
            });
        })(result, expected);
    }
});
//# sourceMappingURL=test-cycle.js.map