import { findWhere } from "../../packages/list/utils/findWhere";
import { alphabetArray, vowelsArray, vowelsString } from "../helpers";
describe(`#listUtils.findWhere`, () => {
    const getPredForEqualTo = (a) => (b) => a === b;
    []
        .concat(
    // Falsy variations
    alphabetArray.slice(0)
        .filter(x => vowelsString.indexOf(x) === -1)
        .slice(0, vowelsString.length) // take only enough for tests
        .flatMap(x => {
        const pred = getPredForEqualTo(x);
        return [
            [pred, vowelsArray, undefined],
            [pred, vowelsString, undefined],
        ];
    }), 
    // Truthy variations
    vowelsArray.flatMap((x) => {
        const pred = getPredForEqualTo(x);
        return [
            [pred, vowelsArray, x],
            [pred, vowelsString, x],
        ];
    }))
        .forEach(([pred, slice, expected]) => {
        it(`findWhere(${pred.toString()}, ${JSON.stringify(slice)}) === ${JSON.stringify(expected)}`, () => {
            const result = findWhere(pred, slice);
            expect(result).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-findWhere.js.map