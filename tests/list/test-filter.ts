import {alphabetArray, alphabetString} from "../helpers";
import {filter} from "../../packages/list/filter";
import {SliceOf} from "../../packages/platform/slice";

describe('#filter', () => {
    const pred = (_, ind): boolean => ind % 2 === 0;
    (<[SliceOf<string>, SliceOf<string>][]>[
        [
            filter(pred, alphabetString as unknown as SliceOf<string>), // @todo fix typing
            alphabetString.split('').filter(pred)
        ],
        [
            filter(pred, alphabetArray),
            alphabetString.split('').filter(pred)
        ],
        [
            filter((c): boolean => c === '#', alphabetArray), []
        ]
    ])
        .forEach(([control, expected]) => {
            it('should return an empty list when no items match predicate', () => {
                expect(control).toEqual(expected);
            });
        });
});
