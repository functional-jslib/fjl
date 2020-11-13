import { groupBy } from "../../packages/list/groupBy";
import { vowelsArray, vowelsString } from "../helpers";
describe(`#list.group`, () => {
    const equal = (a, b) => a === b;
    [
        [equal, vowelsArray, vowelsArray.map(x => [x])],
        [equal, vowelsString, vowelsArray.map(x => [x])],
        [equal, 'Mississippi', [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]],
        [equal, 'Mississippi'.split(''), [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]]
    ].forEach(([pred, xs, expected]) => {
        it(`groupBy(${pred}, ${xs}) === ${expected}`, () => {
            expect(groupBy(pred, xs)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-groupBy.js.map