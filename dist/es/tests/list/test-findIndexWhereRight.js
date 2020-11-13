import { findIndexWhereRight } from "../../packages/list/utils";
import { alphabetArray, vowelsArray, vowelsString } from "../helpers";
describe(`#listUtils.findIndexWhereRight`, () => {
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
        .forEach(([pred, xs, expectedIndex]) => {
        it(`findIndexWhereRight(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expectedIndex)}`, () => {
            const result = findIndexWhereRight(pred, xs);
            expect(result).toEqual(expectedIndex);
        });
    });
});
//# sourceMappingURL=test-findIndexWhereRight.js.map