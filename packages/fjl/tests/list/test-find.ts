import {alphabetArray, expectEqual, vowelsArray, vowelsString} from "../helpers";
import {find} from "../../src/list/find";
import {TernaryPred} from "../../src/types";

describe('#find', () => {
    const word = 'word';
    it('should should find element that matches predicate when element is in given list', () => {
        const pred = (x: string): boolean => x === 'o';
        expectEqual(find(pred, word as unknown as string[]), 'o'); // @todo remove use of `unknown`
        expectEqual(find(pred, word.split('')), 'o');
    });
    it('should return `undefined` when predicate doesn\'t match any elements.', () => {
        const pred = (x: string): boolean => x === 'a';
        expectEqual(find(pred, word as unknown as string[]), undefined);
        expectEqual(find(pred, word.split('')), undefined);
    });

    const getPredForEqualTo = <T>(a: T): TernaryPred<T, number> => (b: T): boolean => a === b;

    (<[TernaryPred, any[], number][]>[]
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
            })
        ))
        .forEach(([pred, slice, expected]) => {
            it(`find(${pred.toString()}, ${JSON.stringify(slice)}) === ${JSON.stringify(expected)}`, () => {
                const result = find(pred, slice);
                expect(result).toEqual(expected);
            });
        });
});

