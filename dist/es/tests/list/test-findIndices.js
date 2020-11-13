import { findIndices } from "../../packages/list/findIndices";
import { alphabetCharCodeRange } from "../helpers";
describe(`#listUtils.findIndices`, () => {
    const oddPred = (x) => x % 2 !== 0, evenPred = (x) => x % 2 === 0, [evenCodes, evenIndices, oddCodes, oddIndices] = alphabetCharCodeRange
        .reduce((agg, x, i) => {
        if (evenPred(x)) {
            agg[0].push(x);
            agg[1].push(i);
        }
        else if (oddPred(x)) {
            agg[2].push(x);
            agg[3].push(i);
        }
        return agg;
    }, [[], [], [], []]);
    // console.log(evenCodes, oddCodes);
    [
        [oddPred, evenCodes, undefined],
        [oddPred, alphabetCharCodeRange, oddIndices],
        [evenPred, oddCodes, undefined],
        [evenPred, alphabetCharCodeRange, evenIndices],
    ]
        .forEach(([pred, xs, expected]) => {
        it(`findIndices(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
            const result = findIndices(pred, xs);
            expect(result).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-findIndices.js.map