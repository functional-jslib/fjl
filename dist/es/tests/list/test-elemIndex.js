import { elemIndex } from "../../packages/list/elemIndex";
import { vowelsArray, vowelsString } from "../helpers";
describe('#elemIndex', () => {
    [
        [['', vowelsArray], undefined],
        [['x', vowelsArray], undefined],
        [['y', vowelsString], undefined],
        [['z', vowelsString], undefined],
    ].concat(vowelsArray.map((x, i, xs) => {
        const revIndex = xs.length - (i + 1), searchStr = xs.slice(revIndex, xs.length).join('');
        return [[searchStr, vowelsString], revIndex];
    }))
        .forEach(([args, expected]) => {
        it(`elemIndex("${args.join('", "')}") === ${expected}`, () => {
            expect(elemIndex(...args)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-elemIndex.js.map