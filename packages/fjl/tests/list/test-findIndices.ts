import {findIndices} from "../../src/list/findIndices";
import {Slice, PredForSlice} from "../../src/types";
import {alphabetCharCodeRange} from "../helpers";

describe(`#listUtils.findIndices`, () => {
    const oddPred = (x: number): boolean => x % 2 !== 0,
        evenPred = (x: number): boolean => x % 2 === 0,
        [evenCodes, evenIndices, oddCodes, oddIndices]: [number[], number[], number[], number[]] = alphabetCharCodeRange
            .reduce((agg, x, i): [number[], number[], number[], number[]] => {
                if (evenPred(x)) {
                    agg[0].push(x);
                    agg[1].push(i);
                } else if (oddPred(x)) {
                    agg[2].push(x);
                    agg[3].push(i);
                }
                return agg;
            }, [[], [], [], []]);

    // console.log(evenCodes, oddCodes);

    (<[PredForSlice<any>, Slice<any>, number[] | undefined][]>[
        [oddPred, evenCodes, undefined],
        [oddPred, alphabetCharCodeRange, oddIndices],
        [evenPred, oddCodes, undefined],
        [evenPred, alphabetCharCodeRange, evenIndices],
    ])
        .forEach(([pred, xs, expected]) => {
            it(`findIndices(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
                const result = findIndices(pred, xs);
                expect(result).toEqual(expected);
            });
        });
});
