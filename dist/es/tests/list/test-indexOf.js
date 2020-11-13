import indexOf from "../../packages/platform/slice/indexOf";
import { vowelsArray, vowelsString } from "../helpers";
describe(`#list.indexOf`, () => {
    [
        [['', vowelsArray], -1],
        [['', vowelsString], 0],
        [['z', vowelsArray], -1],
        [['z', vowelsString], -1]
    ].concat(vowelsArray.flatMap((x, i) => [
        [[x, vowelsString], i],
        [[x, vowelsArray], i]
    ]))
        .forEach(([args, expected]) => {
        it(`indexOf(${args[0]}, ${args[1]}) === ${expected}`, () => {
            expect(indexOf(...args)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-indexOf.js.map