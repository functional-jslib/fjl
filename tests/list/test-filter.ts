import {alphabetArray, alphabetString, expectEqual} from "../helpers";
import {filter} from "../../src/list/filter";

describe('#filter', () => {
    it('should be able to filter a list by a predicate.', () => {
        const pred = (_, ind) => ind % 2 === 0;
        expectEqual(
            filter(pred, alphabetString),
            alphabetString.split('').filter(pred)
        );
        expectEqual(
            filter(pred, alphabetArray),
            alphabetString.split('').filter(pred)
        );
    });
    it('should return an empty list when no items match predicate', () => {
        const pred = char => char === '#';
        expectEqual(filter(pred, alphabetArray), []);
    });
});
