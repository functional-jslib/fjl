import { repeat } from "../../packages/list/repeat";
describe('#repeat', () => {
    const arg = 'a';
    for (let i = 0; i < 5; i += 1) {
        const expected = new Array(i).fill(arg, 0, i).join(''), result = repeat(i, arg);
        ((_result, _expected) => {
            it(`repeat(${i}, "${arg}") === "${_expected}"`, () => {
                expect(_result).toEqual(_expected.split(''));
            });
        })(result, expected);
    }
});
//# sourceMappingURL=test-repeat.js.map