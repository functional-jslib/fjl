import {alphabetArray, alphabetString} from "../helpers";
import {filter} from "../../src/list/filter";
import {Slice} from "../../src/platform/slice";

describe('#filter', () => {
    const pred = (_, ind): boolean => ind % 2 === 0;
    (<[Slice<string>, Slice<string>][]>[
        [
            filter(pred, alphabetString as unknown as Slice<string>), // @todo fix typing
            alphabetString.split('').filter(pred).join('')
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
