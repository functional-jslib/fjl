import { alphabetArray, alphabetString } from "../helpers";
import { filter } from "../../packages/list/filter";
describe('#filter', () => {
    const pred = (_, ind) => ind % 2 === 0;
    [
        [
            filter(pred, alphabetString),
            alphabetString.split('').filter(pred)
        ],
        [
            filter(pred, alphabetArray),
            alphabetString.split('').filter(pred)
        ],
        [
            filter((c) => c === '#', alphabetArray),
            []
        ]
    ]
        .forEach(([control, expected]) => {
        it('should return an empty list when no items match predicate', () => {
            expect(control).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-filter.js.map