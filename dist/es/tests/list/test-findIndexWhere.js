import { findIndexWhere } from "../../packages/list/utils/findexIndexWhere";
import { alphabetArray, vowelsArray, vowelsString } from "../helpers";
describe(`#listUtils.findIndexWhere`, () => {
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
            [pred, vowelsArray, -1],
            [pred, vowelsString, -1],
        ];
    }), 
    // Truthy variations
    vowelsArray.flatMap((x, i) => {
        const pred = getPredForEqualTo(x);
        return [
            [pred, vowelsArray, i],
            [pred, vowelsString, i],
        ];
    }))
        .forEach(([pred, slice, expectedIndex]) => {
        it(`findIndexWhere(${pred.toString()}, ${JSON.stringify(slice)}) === ${JSON.stringify(expectedIndex)}`, () => {
            const result = findIndexWhere(pred, slice);
            expect(result).toEqual(expectedIndex);
        });
    });
});
//# sourceMappingURL=test-findIndexWhere.js.map